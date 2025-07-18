// apps/express-server/src/middlewares/socket.auth.middleware.js

const jwt = require("jsonwebtoken");
const { unauthorized } = require("@hapi/boom");

const queries = require("../../../../../sql/querys.json"); // Path to your SQL queries
const serverConfig = require("../../config/server"); // Path to your server configuration
const {
  postgresInstance,
} = require("../../../../../packages/db-component/db.definitions"); // Path to your DB instance

const getCookieFromHeader = (cookieHeader, name) => {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").map((s) => s.trim());
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));

  return cookie ? cookie.substring(name.length + 1) : null;
};

const socketAuthMiddleware = async (socket, next) => {
  const cookieHeader = socket.request.headers.cookie;
  const accessToken = getCookieFromHeader(cookieHeader, "access_token"); // Ensure cookie name matches
  const refreshToken = getCookieFromHeader(cookieHeader, "refresh_token"); // Ensure cookie name matches

  if (!accessToken) {
    console.warn(
      `[SocketAuth] Connection ${socket.id} rejected: 'access_token' cookie missing.`
    );
    return next(
      unauthorized("Authentication access token missing. Please log in.")
    );
  }

  try {
    const decodedAccessToken = jwt.verify(
      accessToken,
      serverConfig.JWT_ACCESS_TOKEN_SECRET // Use serverConfig for access token secret
    );

    // --- RECOMMENDED: Validate Access Token JTI against DB session ---
    // Make sure your Access Token JWT includes a 'jti' claim that matches sessions.at_jti
    if (!decodedAccessToken.jti) {
      console.warn(
        `[SocketAuth] Access Token for ${socket.id} missing JTI claim. Rejecting.`
      );
      return next(unauthorized("Invalid access token: Missing JTI."));
    }

    const sessionRecord = await postgresInstance.queryOne(
      queries.sessions.getSessionByAtJtiAndUser, // Assuming you have a query like this
      [decodedAccessToken.jti, decodedAccessToken.sub || decodedAccessToken.id] // Use 'sub' or 'id' based on your JWT payload
    );

    if (
      !sessionRecord ||
      sessionRecord.revoked ||
      new Date(sessionRecord.expires) < new Date()
    ) {
      console.warn(
        `[SocketAuth] Access Token session (JTI: ${decodedAccessToken.jti}) is revoked, expired in DB, or not found for ${socket.id}.`
      );
      return next(
        unauthorized("Session for access token is invalid or revoked.")
      );
    }
    // --- END RECOMMENDED VALIDATION ---

    socket.user = decodedAccessToken; // This will contain { sub, jti, exp, iat, roleId, etc. }
    socket.shouldNotifyRefresh = false; // Access token is valid, no refresh needed

    return next();
  } catch (accessError) {
    console.warn(
      `[SocketAuth] Access Token error for ${socket.id}: ${accessError.message}`
    ); // Added for debugging
    if (accessError.name === "TokenExpiredError" && refreshToken) {
      try {
        const decodedRefreshToken = jwt.verify(
          refreshToken,
          serverConfig.JWT_REFRESH_TOKEN_SECRET // Use serverConfig for refresh token secret
        );

        // --- Validate Refresh Token JTI against DB session ---
        // Make sure your Refresh Token JWT includes a 'jti' claim that matches sessions.rt_jti
        if (!decodedRefreshToken.jti) {
          console.warn(
            `[SocketAuth] Refresh Token for ${socket.id} missing JTI claim. Rejecting.`
          );
          return next(unauthorized("Invalid refresh token: Missing JTI."));
        }

        const storedRefreshTokenRecord = await postgresInstance.queryOne(
          queries.sessions.getSessionByRtJtiAndUser, // Assuming you have a query like this
          [
            decodedRefreshToken.jti,
            decodedRefreshToken.sub || decodedRefreshToken.id,
          ] // Use 'sub' or 'id'
        );

        if (
          !storedRefreshTokenRecord || // Corrected variable name from sessionRecordForRefresh
          storedRefreshTokenRecord.revoked ||
          new Date(storedRefreshTokenRecord.expires) < new Date()
        ) {
          console.warn(
            `[SocketAuth] Refresh Token session (JTI: ${decodedRefreshToken.jti}) is invalid, revoked, or expired in DB for ${socket.id}.`
          ); // Added for debugging
          return next(
            unauthorized(
              "Session for refresh token is invalid or revoked. Please login again."
            )
          );
        }

        socket.user = decodedRefreshToken; // This will contain { sub, jti, exp, iat }
        socket.shouldNotifyRefresh = true; // Flag to notify client to refresh session HTTP-side

        return next();
      } catch (refreshVerificationError) {
        console.warn(
          `[SocketAuth] Refresh Token verification failed for ${socket.id}: ${refreshVerificationError.message}`
        ); // Added for debugging
        return next(
          unauthorized(
            "Failed to authenticate with refresh token. Please login again."
          )
        );
      }
    } else {
      console.warn(
        `[SocketAuth] Connection ${socket.id} rejected: Access token invalid or no refresh token provided.`
      ); // Added for debugging
      return next(
        unauthorized("Invalid authentication token. Please login again.")
      );
    }
  }
};

module.exports = socketAuthMiddleware;

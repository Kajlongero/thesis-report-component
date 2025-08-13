const { unauthorized } = require("@hapi/boom");

const dbQueries = require("../../../../sql/querys.json");
const COMMON_RESPONSES = require("../constants/responses");

const { postgresInstance } = require("../components/db/db.definitions");
const { txAuthRequired } = require("../utils/transaction.auths");

const validateSession = async (req, res, next) => {
  const { tx } = req.body;

  if (!txAuthRequired.has(tx)) return next();

  const user = req.user;

  const session = await postgresInstance.queryOne(
    dbQueries.sessions.getSessionByUserAndAt,
    [user.jti, user.sub]
  );
  if (!session || session.revoked) {
    res.clearCookie("userId");
    res.clearCookie("sessionId");
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return next(unauthorized(COMMON_RESPONSES[401].TOKEN_INVALID));
  }

  if (new Date(session.expires).toISOString() < new Date().toISOString())
    return next(unauthorized(COMMON_RESPONSES[401].TOKEN_EXPIRED));

  req.session = session;

  return next();
};

module.exports = validateSession;

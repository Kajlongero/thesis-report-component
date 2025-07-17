const errorResponses = {
  401: {
    UNAUTHORIZED: "Unauthorized",
    TOKEN_EXPIRED: "Token expired",
    TOKEN_NOT_FOUND: "Token required",
    NOT_VALID_ACCESS_JWT: "Invalid Token",
    NOT_VALID_REFRESH_JWT: "Invalid Token",
  },
  403: {},
  404: {},
};

module.exports = errorResponses;

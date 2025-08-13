const COMMON_RESPONSES = {
  400: {},
  401: {
    UNAUTHORIZED: "You do not have permissions to perform this action",
    TOKEN_EXPIRED: "Token expired",
    TOKEN_INVALID: "Invalid token",
  },
};

module.exports = COMMON_RESPONSES;

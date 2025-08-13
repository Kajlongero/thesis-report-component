const { unauthorized } = require("@hapi/boom");

const { postgresInstance } = require("../components/db/db.definitions");
const CACHE_KEYS = require("../constants/cache");

const CacheService = require("../lib/cache");
const cacheService = new CacheService();

const dbQueries = require("../../../../sql/querys.json");

class AuthorizationService {
  static #instance;

  constructor() {
    if (AuthorizationService.#instance) {
      return AuthorizationService.#instance;
    }
    AuthorizationService.#instance = this;
  }

  async hasSession(payload) {
    const session = await postgresInstance.queryOne(
      dbQueries.sessions.getSessionByUserAndAt,
      [payload.jti, payload.sub]
    );
    if (!session || session.revoked) throw unauthorized("Invalid Session");

    if (new Date(session.expires).toISOString() < new Date().toISOString())
      throw unauthorized("Token expired");

    return session;
  }

  UserHasPermission(req, res, { role, method }) {
    const cache = cacheService.findInCache(CACHE_KEYS.ROLE_METHOD_PERMISSIONS);

    const permittedMethods = cache.get(role);

    if (!permittedMethods) return false;

    return permittedMethods.has(method);
  }

  async ValidateSession(req, res) {
    const decoded = req.user;

    const session = await postgresInstance.queryOne(
      dbQueries.sessions.getSessionByUserAndAt,
      [decoded.jti, decoded.sub]
    );
    if (!session) throw unauthorized("Invalid Session");

    if (new Date(session.expires).toISOString() < new Date().toISOString())
      throw unauthorized("Token expired");

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    return {
      data: true,
      error: "",
      message: "Success",
      statusCode: 200,
    };
  }

  clearPermissions() {
    this.rolePermissionsMap.clear();
  }
}

module.exports = AuthorizationService;

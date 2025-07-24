const CACHE_KEYS = require("../constants/cache");

const CacheService = require("../lib/cache");
const cacheService = new CacheService();

class AuthorizationService {
  static #instance;

  constructor() {
    if (AuthorizationService.#instance) {
      return AuthorizationService.#instance;
    }
    AuthorizationService.#instance = this;
  }

  UserHasPermission(req, res, { role, method }) {
    const cache = cacheService.findInCache(CACHE_KEYS.ROLE_METHOD_PERMISSIONS);

    const permittedMethods = cache.get(role);

    if (!permittedMethods) return false;

    return permittedMethods.has(method);
  }

  clearPermissions() {
    this.rolePermissionsMap.clear();
  }
}

module.exports = AuthorizationService;

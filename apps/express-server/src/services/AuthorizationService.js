class AuthorizationService {
  static #instance;

  constructor() {
    this.rolePermissionsMap = new Map();
  }

  static getInstance() {
    if (!AuthorizationService.#instance) {
      AuthorizationService.#instance = new AuthorizationService();
    }
    return AuthorizationService.#instance;
  }

  initialize(dbRows) {
    this.rolePermissionsMap.clear();

    if (!Array.isArray(dbRows)) return;

    dbRows.forEach((row) => {
      const { roleName, methodName } = row;

      if (typeof roleName === undefined || typeof methodName === undefined)
        return;

      if (!this.rolePermissionsMap.has(roleName)) {
        this.rolePermissionsMap.set(roleName, new Set());
      }
      this.rolePermissionsMap.get(roleName).add(methodName);
    });
  }

  UserHasPermission(req, res, { role, method }) {
    if (typeof role === undefined || typeof method === undefined) return false;

    const permittedMethods = this.rolePermissionsMap.get(role);
    if (!permittedMethods) return false;

    return permittedMethods.has(method);
  }

  clearPermissions() {
    this.rolePermissionsMap.clear();
  }
}

module.exports = AuthorizationService;

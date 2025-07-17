class CacheService {
  constructor() {}

  static getInstance(id, connectionString, engine) {
    if (!this.instances.has(id)) {
      this.instances.set(id, new DBComponent(connectionString, engine));
    }
    return this.instances.get(id);
  }
}

module.exports = CacheService;

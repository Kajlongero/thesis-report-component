class CacheLoader {
  static #instance;

  instances = new Map();

  constructor() {}

  static getInstance() {
    if (!CacheLoader.#instance) {
      CacheLoader.#instance = new CacheLoader();
    }

    return CacheLoader.#instance;
  }

  saveInstance(id, instance) {
    this.instances.set(id, instance);
  }

  findInstance(id) {
    return this.instances.get(id);
  }

  clearInstances() {
    this.instances.clear();
  }
}

module.exports = CacheLoader;

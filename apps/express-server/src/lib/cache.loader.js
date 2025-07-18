class CacheLoader {
  static #instance; // Private static field

  constructor() {
    if (CacheLoader.#instance) {
      return CacheLoader.#instance;
    }
    CacheLoader.#instance = this;
    this.instances = new Map(); // Instance property
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

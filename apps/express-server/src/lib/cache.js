class CacheService {
  static #instance;

  map = new Map();

  constructor() {
    if (CacheService.#instance) return CacheService.#instance;

    CacheService.#instance = this;
  }

  addToCache(key, value) {
    this.map.set(key, value);
  }

  findInCache(key) {
    return this.map.get(key);
  }

  hasInCache(key) {
    return this.map.has(key);
  }

  clearCache() {
    this.map.clear();
  }
}

module.exports = CacheService;

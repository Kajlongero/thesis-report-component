const { notFound } = require("@hapi/boom");

class ObjectMapperComponent {
  static #instance;

  map = new Map();
  data = new Map();

  constructor() {
    if (ObjectMapperComponent.#instance) {
      return ObjectMapperComponent.#instance;
    }
    ObjectMapperComponent.#instance = this;
  }

  generate(data) {
    this.data = data;

    data.map(({ objectName, methodName }, index) => {
      this.map.set(index, `${index}_${objectName}_${methodName}`);
    });
  }

  findNames(id) {
    const has = this.#has(id);

    if (!has) throw new notFound("Transaction id invalid");

    const data = this.map.get(id);
    const [identifier, objectName, methodName] = data.split("_");

    return {
      objectName,
      methodName,
    };
  }

  #has(id) {
    return this.map.has(id);
  }
}

module.exports = ObjectMapperComponent;

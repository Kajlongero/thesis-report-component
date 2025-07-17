const { notFound } = require("@hapi/boom");

class MapComponent {
  constructor() {
    this.data = new Map();
    this.map = new Map();
  }

  generate(data) {
    this.data = data;

    const map = new Map();

    data.map(({ objectname, methodname }, index) => {
      map.set(index, `${index}_${objectname}_${methodname}`);
    });

    this.map = map;
  }

  #has(id) {
    return this.map.has(id);
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
}

module.exports = MapComponent;

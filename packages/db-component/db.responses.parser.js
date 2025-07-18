class DBResponsesParser {
  static #instance;

  constructor() {
    this.memo = new Map();
  }

  static getInstance() {
    if (!DBResponsesParser.#instance) {
      this.#instance = new DBResponsesParser();

      return this.#instance;
    }

    return this.#instance;
  }

  parse(obj) {
    const newObj = {};

    for (const [key, val] of Object.entries(obj)) {
      const parsed = this.transform(key);

      if (val === null || val === undefined) {
        newObj[parsed] = val;
        continue;
      }

      if (
        !Array.isArray(val) &&
        typeof val === "object" &&
        val instanceof Date
      ) {
        newObj[parsed] = val.toISOString();
        continue;
      }

      if (!Array.isArray(val) && typeof val === "object") {
        newObj[parsed] = this.parse(val);
        continue;
      }

      if (typeof val === "string" && !isNaN(Date.parse(val))) {
        newObj[parsed] = new Date(val).toISOString();
        continue;
      }

      newObj[parsed] = val;
    }

    return newObj;
  }

  transform(str) {
    if (this.memo.has(str)) return this.memo.get(str);

    const split = str.split("_");
    if (split.length < 2) return str;

    let field = "";

    split.map((elem, index) => {
      if (index === 0) {
        field += elem;
      } else {
        const firstLetter = elem[0].toUpperCase();
        const word = elem.substring(1, elem.length);
        const parsed = `${firstLetter}${word}`;

        field += parsed;
      }
    });

    this.memo.set(str, field);

    return field;
  }
}

module.exports = DBResponsesParser;

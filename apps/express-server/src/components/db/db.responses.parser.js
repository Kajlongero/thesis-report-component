class DBResponsesParser {
  static #instance;
  #memo = new Map();

  constructor() {
    if (DBResponsesParser.#instance) {
      return DBResponsesParser.#instance;
    }
    DBResponsesParser.#instance = this;
  }

  static getInstance() {
    if (!DBResponsesParser.#instance) {
      DBResponsesParser.#instance = new DBResponsesParser();
    }
    return DBResponsesParser.#instance;
  }

  parse(obj) {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.parse(item));
    }

    if (typeof obj !== "object" || obj === null) {
      return obj;
    }

    const newObj = {};
    for (const [key, val] of Object.entries(obj)) {
      const parsedKey = this.transform(key);

      if (typeof val === "object" && val !== null && !(val instanceof Date)) {
        if (Object.keys(val).length === 0) {
          newObj[parsedKey] = null;
        } else {
          newObj[parsedKey] = this.parse(val);
        }
      } else if (val instanceof Date) {
        newObj[parsedKey] = val.toISOString();
      } else if (typeof val === "string") {
        if (!isNaN(val) && !isNaN(parseFloat(val))) {
          newObj[parsedKey] = parseFloat(val);
        } else if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(val)) {
          newObj[parsedKey] = new Date(val).toISOString();
        } else {
          newObj[parsedKey] = val;
        }
      } else {
        newObj[parsedKey] = val;
      }
    }

    return newObj;
  }

  transform(str) {
    if (this.#memo.has(str)) {
      return this.#memo.get(str);
    }

    const result = str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());

    this.#memo.set(str, result);
    return result;
  }
}

module.exports = DBResponsesParser;

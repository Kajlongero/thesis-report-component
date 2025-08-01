const { Pool } = require("pg");

const DBResponsesParser = require("./db.responses.parser");

const parser = DBResponsesParser.getInstance();

class DBComponent {
  static #instances = new Map();

  constructor(id, connectionString) {
    if (DBComponent.#instances.has(id)) {
      return DBComponent.#instances.get(id);
    }
    this.pool = new Pool({
      connectionString,
    });
    DBComponent.#instances.set(id, this);
    return this;
  }

  async query(sql, params = []) {
    const client = await this.pool.connect();

    try {
      const result = await client.query(sql, params);
      const parsed = result.rows.map((elem) => parser.parse(elem));

      return parsed;
    } catch (error) {
      return [null];
    } finally {
      client.release();
    }
  }

  async queryOne(sql, params = []) {
    try {
      const res = await this.query(sql, params);
      const elem = res.length > 0 ? res[0] : null;

      return elem;
    } catch (error) {
      return null;
    }
  }

  async queryTransactions(queries) {
    const client = await this.pool.connect();

    try {
      await client.query("BEGIN");

      const results = [];

      for (const { sql, params, returnedElements } of queries) {
        if (!sql) continue;

        const result = await client.query(sql, params);
        const parsed = result.rows.map((elem) => parser.parse(elem));

        if (returnedElements) results.push(parsed);
      }

      await client.query("COMMIT");

      return results;
    } catch (error) {
      await client.query("ROLLBACK");
      return null;
    } finally {
      client.release();
    }
  }
}

module.exports = DBComponent;

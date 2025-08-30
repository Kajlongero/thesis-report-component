const transformBeforeReplace = (value) => {
  if (value instanceof Date)
    return value.toLocaleString("es-VE", { timeZone: "America/Caracas" });

  if (typeof value === "object" && value !== null && !Array.isArray(value))
    return JSON.stringify(value, null, 2);

  // Caso 3: El valor es nulo o indefinido
  if (value === null || value === undefined) return "";

  return String(value);
};

const replacePlaceholdersForData = (ops, placeholdersMap, queriesMap) => {
  return ops.map((op) => {
    const insert = op.insert;

    if (!insert.startsWith("{") || !insert.endsWith("}")) return op;

    const attr = op.attributes;
    const values = Object.keys(attr);

    if (!values.includes("custom-placeholder")) return op;

    const id = parseInt(attr["custom-placeholder"].id);

    const getPlaceholder = placeholdersMap.get(id);
    if (!getPlaceholder) return op;

    const { field, queryId } = getPlaceholder;

    const getQuery = queriesMap.get(queryId);
    if (!getQuery || !getQuery.results) return op;

    const results = getQuery.results;

    const value = transformBeforeReplace(results[field]);

    const replaced = { ...op, insert: value };
    delete replaced.attributes["custom-placeholder"];

    return replaced;
  });
};

module.exports = {
  replacePlaceholdersForData,
};

const getTemplateAndPlaceholders = async (db, queries, templateId, cb) => {
  const getTemplate = await db.queryOne(queries.templates.getTemplateById, [
    templateId,
  ]);
  if (!getTemplate)
    return cb({
      code: 404,
      error: "Not Found",
      message: "Template not found",
      object: "notFound",
    });

  const { placeholders } = await db.queryOne(
    queries.templates.getPlaceholdersByTemplateId,
    [templateId]
  );

  return { template: getTemplate, placeholders: placeholders };
};

const generateDataMaps = (elements) => {
  const queries = new Map();
  const placeholders = new Map();

  elements.forEach(({ id, name, field, query }, index) => {
    const queryId = query.id;

    const { id: qId, query_text: qText } = query;

    placeholders.set(id, { name, queryId, field });

    if (queries.has(queryId)) {
      const element = queries.get(queryId);
      const placeholders = element.placeholders || [];

      placeholders.push({ id, name, field });
      queries.set(queryId, { ...element, placeholders });
    } else {
      const element = {
        id: qId,
        query: qText,
        results: null,
        executed: false,
        placeholders: [{ id, name, field }],
      };

      queries.set(queryId, element);
    }
  });

  return { queries, placeholders };
};

const executeQueriesAndFillMap = async (db, queries, { params }) => {
  for await (const [key, value] of queries) {
    if (queries.get(key).executed) continue;

    const { id, query } = value;

    const execute = await db.queryOne(query, params[id]);

    queries.set(key, {
      ...queries.get(key),
      results: execute,
      executed: true,
    });
  }

  return { queries };
};

module.exports = {
  getTemplateAndPlaceholders,
  generateDataMaps,
  executeQueriesAndFillMap,
};

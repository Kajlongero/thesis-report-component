const queries = require("../../sql/querys.json");

async function processDelta(postgresInstance, templateId, reportParams) {
  const getTemplate = await postgresInstance.queryOne(
    queries.templates.getTemplateById,
    [templateId]
  );
  if (!getTemplate) {
    throw new Error("Template not found");
  }

  const { placeholders } = await postgresInstance.queryOne(
    queries.templates.getPlaceholdersByTemplateId,
    [templateId]
  );

  if (!placeholders || placeholders.length === 0) {
    return JSON.parse(getTemplate.templateDefinition);
  }

  const placeholderMap = new Map(placeholders.map(p => [p.id, p]));

  const groupedPlaceholders = placeholders.reduce((acc, placeholder) => {
    const queryId = placeholder.query.id;
    if (!acc[queryId]) {
      acc[queryId] = {
        queryText: placeholder.query.query_text,
      };
    }
    return acc;
  }, {});

  const queryCache = new Map();

  for (const queryId in groupedPlaceholders) {
    const { queryText } = groupedPlaceholders[queryId];
    const params = reportParams[queryId] || [];
    const result = await postgresInstance.query(queryText, params);
    queryCache.set(parseInt(queryId), result);
  }

  let delta = JSON.parse(getTemplate.templateDefinition);

  delta.ops = delta.ops.map(op => {
    if (op.attributes && op.attributes.placeholder) {
      const placeholderId = op.attributes.placeholder.id;
      const placeholderInfo = placeholderMap.get(placeholderId);

      if (placeholderInfo) {
        const queryId = placeholderInfo.query.id;
        const result = queryCache.get(queryId);

        if (result) {
          const field = placeholderInfo.field;
          const value = result.length > 0 ? result[0][field] : '';

          delete op.attributes.placeholder;
          op.insert = String(value);
        }
      }
    }
    return op;
  });

  return delta;
}

module.exports = { processDelta };

const {
  postgresInstance,
} = require("../../../../packages/components/db/db.definitions");

const querys = require("../../../../sql/querys.json");
const postgres = postgresInstance("html-grpc");

const { convertToHtml } = require("../../../../packages/lib/html");
const generateDocxFromHtml = require("../utils/generate.docx");
const {
  replacePlaceholdersForData,
} = require("../../../../packages/lib/delta");
const {
  executeQueriesAndFillMap,
  generateDataMaps,
  getTemplateAndPlaceholders,
} = require("../../../../packages/lib/converter");

async function GenerateReports(call, callback) {
  try {
    const { templateId, params } = call.request;

    const { template, placeholders: placeholdersArray } =
      await getTemplateAndPlaceholders(postgres, querys, templateId, callback);

    const { queries: queriesMap, placeholders } =
      generateDataMaps(placeholdersArray);

    const parsed = {
      ...call.request,
      params: JSON.parse(params),
    };

    const { queries } = await executeQueriesAndFillMap(
      postgres,
      queriesMap,
      parsed
    );

    const delta = template.template_definition.delta.ops;
    const replaced = replacePlaceholdersForData(delta, placeholders, queries);

    const html = convertToHtml(replaced);

    const docxContent = await generateDocxFromHtml(html);

    callback(null, {
      docxContent,
      error: "",
      message: "Success",
      statusCode: 200,
    });
  } catch (error) {
    callback({
      code: 500,
      error: "Internal Server Error",
      message: error.message,
    });
  }
}

module.exports = GenerateReports;

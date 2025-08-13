const { unauthorized, badRequest } = require("@hapi/boom");

const queries = require("../../../../sql/querys.json");

const CursorService = require("../lib/cursor");

const { postgresInstance } = require("../components/db/db.definitions");
const { getClient, getServiceClient } = require("../lib/grpc.client");
const {
  getAllTemplatesSchema,
  getTemplateByIdSchema,
} = require("../models/templates");

const cursorService = new CursorService();

class TemplateService {
  MAX_CURSOR_LIMIT = 50;

  async GetAllTemplates(req, res, params) {
    const { error } = getAllTemplatesSchema.validate(params);
    if (error) throw badRequest(error);

    const user = req.user;

    const limit = Math.min(
      parseInt(params.limit, 10) || 30,
      this.MAX_CURSOR_LIMIT
    );

    const cursorData = cursorService.decode(params.cursor);

    let query;
    let queryParams;

    switch (user.role[0]) {
      case "OWNER":
      case "ADMIN": {
        if (cursorData) {
          query = queries.templates.getAllTemplatesCursor;
          queryParams = [cursorData.id, limit + 1];
        } else {
          query = queries.templates.getAllTemplates;
          queryParams = [limit + 1];
        }
        break;
      }
      default:
        throw unauthorized(COMMON_RESPONSES[401].UNAUTHORIZED);
    }

    const results = await postgresInstance.query(query, queryParams);

    const hasNextPage = results.length > limit;

    if (hasNextPage) results.pop();

    const lastElement = results.length > 0 ? results[results.length - 1] : null;
    const nextCursor = cursorService.encode(lastElement);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    return {
      data: results,
      message: "Success",
      statusCode: 200,
      pagination: {
        nextCursor,
        hasNextPage,
        actualCursor: params.cursor,
      },
    };
  }
  async GetTemplateById(req, res, params) {
    const { error } = getTemplateByIdSchema.validate(params);
    if (error) throw badRequest(error);

    const user = req.user;

    const report = await postgresInstance.queryOne(
      queries.reports.getReportsById,
      [params.id]
    );

    if (user.role[0] === "USER" && report.authorId !== parseInt(user.sub))
      throw unauthorized();

    return report;
  }
}

module.exports = TemplateService;

const { unauthorized } = require("@hapi/boom");

const queries = require("../../../../sql/querys.json");

const CacheService = require("../lib/cache");
const CursorService = require("../lib/cursor");
const AuthorizationService = require("./AuthorizationService");

const { getClient, getServiceClient } = require("../lib/grpc.client");

const auth = new AuthorizationService();
const cursorService = new CursorService();
const { postgresInstance } = require("../components/db/db.definitions");

class TemplateService {
  MAX_CURSOR_LIMIT = 50;

  async GetAllTemplates(req, res, params) {
    const user = req.user;

    const result = await auth.hasSession(user);
    if (!result)
      throw unauthorized("You do not have permissions to perform this action");

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
        throw unauthorized(
          "You do not have permissions to perform this action"
        );
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
    const user = req.user;

    const result = await auth.hasSession(user);
    if (!result)
      throw unauthorized("You do not have permissions to perform this action");

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

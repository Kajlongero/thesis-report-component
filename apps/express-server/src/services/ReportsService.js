const { unauthorized } = require("@hapi/boom");

const queries = require("../../../../sql/querys.json");

const CacheService = require("../lib/cache");
const CursorService = require("../lib/cursor");
const AuthorizationService = require("./AuthorizationService");

const { getClient, getServiceClient } = require("../lib/grpc.client");

const auth = new AuthorizationService();
const cacheService = new CacheService();
const cursorService = new CursorService();
const { postgresInstance } = require("../components/db/db.definitions");

class ReportsService {
  MAX_CURSOR_LIMIT = 100;
  async DashboardData(req, res, params) {
    const user = req.user;

    const hasSession = await auth.hasSession(user);
    if (!hasSession) throw unauthorized("Invalid session");

    const promises = {};

    switch (user.role[0]) {
      case "OWNER":
      case "ADMIN": {
        promises.totalReports = postgresInstance.queryOne(
          queries.dashboard.getTotalReports,
          []
        );
        promises.resolvedReports = postgresInstance.queryOne(
          queries.dashboard.getResolvedReports,
          [1]
        );
        promises.pendingReports = postgresInstance.queryOne(
          queries.dashboard.getPendingReports,
          [2]
        );
        promises.avgResponseTime = postgresInstance.queryOne(
          queries.dashboard.getAvgResponseTime,
          []
        );
        promises.activeUsers = postgresInstance.queryOne(
          queries.dashboard.getActiveUsers,
          []
        );
        break;
      }

      case "USER": {
        promises.totalReports = postgresInstance.queryOne(
          queries.dashboard.getOwnTotalReports,
          [user.sub]
        );
        promises.resolvedReports = postgresInstance.queryOne(
          queries.dashboard.getOwnResolvedReports,
          [1, user.sub]
        );
        promises.pendingReports = postgresInstance.queryOne(
          queries.dashboard.getOwnPendingReports,
          [2, user.sub]
        );
        promises.avgResponseTime = postgresInstance.queryOne(
          queries.dashboard.getOwnAvgResponseTime,
          [user.sub]
        );
        break;
      }

      default:
        throw unauthorized(
          "You do not have permissions to perform this action"
        );
    }

    const results = await Promise.all(Object.values(promises));

    const data = {};

    Object.keys(promises).forEach((key, index) => {
      data[key] = results[index];
    });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    return {
      data: results,
      error: "",
      message: "Success",
      statusCode: 200,
    };
  }
  async GetAllReports(req, res, params) {
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
          const createdAt = new Date(cursorData.createdAt).toISOString();

          query = queries.reports.getAllReportsCursor;
          queryParams = [createdAt, cursorData.id, limit + 1];
        } else {
          query = queries.reports.getAllReports;
          queryParams = [limit + 1];
        }
        break;
      }

      case "USER": {
        if (cursorData) {
          const createdAt = new Date(cursorData.createdAt).toISOString();

          query = queries.reports.getAllOwnReportsCursor;
          queryParams = [user.sub, createdAt, cursorData.id, limit + 1];
        } else {
          query = queries.reports.getAllOwnReports;
          queryParams = [user.sub, limit + 1];
        }
        break;
      }

      default:
        throw unauthorized(
          "You do not have permissions to perform this action"
        );
    }

    console.log(query, queryParams);

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
  async GetReportById(req, res, params) {
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
  async CreateReports(req, res, params) {}

  async GeneratePDF(req, res, params) {}
  async GenerateCSV(req, res, params) {}
  async GenerateHTML(req, res, params) {}
  async GenerateDOCX(req, res, params) {}
  async GeneratePDF(req, res, params) {}
}

module.exports = ReportsService;

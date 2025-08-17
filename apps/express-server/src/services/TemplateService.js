const { unauthorized, badRequest, notFound } = require("@hapi/boom");

const queries = require("../../../../sql/querys.json");

const CursorService = require("../lib/cursor");

const { postgresInstance } = require("../components/db/db.definitions");
const {
  getAllTemplatesSchema,
  getTemplateByIdSchema,
  createTemplateSchema,
  updateTemplateSchema,
} = require("../models/templates");

const cursorService = new CursorService();

const ALLOWED_ROLES = ["OWNER", "ADMIN"];

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

    if (!ALLOWED_ROLES.includes(user.role[0]))
      throw unauthorized("You do not have permissions to perform this action");

    const template = await postgresInstance.queryOne(
      queries.templates.getTemplateById,
      [params.id]
    );
    if (!template) throw notFound("Template not found");

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    return {
      data: template,
      error: "",
      message: "Success",
      statusCode: 200,
    };
  }

  async CreateTemplate(req, res, body) {
    const { error } = createTemplateSchema.validate(body);
    if (error) throw badRequest(error);

    const user = req.user;

    if (!ALLOWED_ROLES.includes(user.role[0]))
      throw unauthorized("You do not have permissions to perform this action");

    const {
      name,
      description,
      template_type_id,
      template_definition,
      is_public,
    } = body;

    const result = await postgresInstance.queryOne(
      queries.templates.createTemplate,
      [
        name,
        description,
        template_type_id,
        template_definition,
        user.sub,
        is_public,
      ]
    );
    if (!result) throw internal("Failed to create template");

    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");

    return {
      data: result,
      error: "",
      message: "Success",
      statusCode: 200,
    };
  }

  async UpdateTemplate(req, res, body) {
    const { error } = updateTemplateSchema.validate(body);
    if (error) throw badRequest(error);

    const user = req.user;

    if (!ALLOWED_ROLES.includes(user.role[0]))
      throw unauthorized("You do not have permissions to perform this action");

    const {
      id,
      name,
      description,
      template_type_id,
      template_definition,
      is_public,
      is_active,
    } = body;

    const template = await postgresInstance.queryOne(
      queries.templates.getTemplateById,
      [id]
    );
    if (!template) throw notFound("Template not found");

    const result = await postgresInstance.queryOne(
      queries.templates.updateTemplate,
      [
        name,
        description,
        template_type_id,
        template_definition,
        is_public,
        is_active,
        id,
      ]
    );

    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");

    return {
      data: result,
      error: "",
      message: "Success",
      statusCode: 200,
    };
  }
}

module.exports = TemplateService;

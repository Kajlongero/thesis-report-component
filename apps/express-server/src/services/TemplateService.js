const { unauthorized, badRequest } = require("@hapi/boom");

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

    const template = await postgresInstance.queryOne(
      queries.templates.getTemplateById,
      [params.id]
    );

    if (user.role[0] === "USER" && !template.is_public)
      throw unauthorized();

    return template;
  }

  async CreateTemplate(req, res, body) {
    const { error } = createTemplateSchema.validate(body);
    if (error) throw badRequest(error);

    const user = req.user;

    const { name, description, template_type_id, template_definition, is_public } = body;

    const result = await postgresInstance.queryOne(
      queries.templates.createTemplate,
      [name, description, template_type_id, template_definition, user.sub, is_public]
    );

    return result;
  }

  async UpdateTemplate(req, res, body) {
    const { error } = updateTemplateSchema.validate(body);
    if (error) throw badRequest(error);

    const { id, name, description, template_type_id, template_definition, is_public, is_active } = body;

    const result = await postgresInstance.queryOne(
      queries.templates.updateTemplate,
      [name, description, template_type_id, template_definition, is_public, is_active, id]
    );

    return result;
  }
}

module.exports = TemplateService;

const { badRequest } = require("@hapi/boom");
const { postgresInstance } = require("../components/db/db.definitions");
const dbQueries = require("../../../../sql/querys.json");
const { updateUserSchema } = require("../models/Authorization");

class UserService {
  static #instance;

  constructor() {
    if (UserService.#instance) {
      return UserService.#instance;
    }
    UserService.#instance = this;
  }

  async UpdateUser(req, res, params) {
    const body = params;
    const user = req.user;

    const session = await authorizationService.hasSession(req.user);

    const { error } = updateUserSchema.validate(body);
    if (error) throw badRequest(error.details[0].message);

    const updatedUser = await postgresInstance.queryOne(
      dbQueries.user.updateUser,
      [user.sub, firstName, lastName]
    );
    if (!updatedUser) throw internal("Failed to update user");

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    return {
      data: req.body,
      error: "",
      message: "User updated successfully",
      statusCode: 200,
    };
  }

  async DeleteUser(req, res) {
    const user = req.user;

    const session = await authorizationService.hasSession(req.user);

    const deletedUser = await postgresInstance.queryOne(
      dbQueries.user.deleteUser,
      [user.sub]
    );
    if (!deletedUser) throw internal("Failed to delete user");

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    return {
      data: user.sub,
      error: "",
      message: "User deleted successfully",
      statusCode: 200,
    };
  }
}

module.exports = UserService;

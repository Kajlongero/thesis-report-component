const { badRequest, internal } = require("@hapi/boom");

const dbQueries = require("../../../../sql/querys.json");

const { updateUserSchema } = require("../models/user");
const { postgresInstance } = require("../components/db/db.definitions");

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

    const { error } = updateUserSchema.validate(body);
    if (error) throw badRequest(error.details[0].message);

    const updatedUser = await postgresInstance.queryOne(
      dbQueries.user.updateUser,
      [user.sub, body.firstName, body.lastName]
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

    const transaction = await postgresInstance.queryTransactions([
      {
        sql: dbQueries.user.deleteUser,
        params: [user.sub],
        returnedElements: true,
      },
      {
        sql: dbQueries.sessions.deleteSessions,
        params: [user.sub],
        returnedElements: false,
      },
    ]);

    if (!transaction || !transaction[0] || !transaction[0][0]) {
      throw internal("Failed to delete user");
    }

    const deletedUser = transaction[0][0];

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    return {
      data: {
        id: deletedUser.id,
      },
      error: "",
      message: "User deleted successfully",
      statusCode: 200,
    };
  }
}

module.exports = UserService;

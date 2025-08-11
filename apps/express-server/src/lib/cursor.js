const { unauthorized } = require("@hapi/boom");

class CursorService {
  encode(lastElement) {
    if (!lastElement || !lastElement.id) return null;

    const createdAt = lastElement.createdAt || lastElement.created_at;

    if (!createdAt) return null;

    const cursorObject = {
      id: lastElement.id,
      createdAt: new Date(createdAt).toISOString(),
    };

    const jsonString = JSON.stringify(cursorObject);

    return Buffer.from(jsonString).toString("base64");
  }

  decode(cursorString) {
    if (!cursorString) return null;

    try {
      const buffer = Buffer.from(cursorString, "base64");
      const decoded = buffer.toString("ascii");

      const parsed = JSON.parse(decoded);

      return parsed;
    } catch (error) {
      throw unauthorized("Invalid cursor format");
    }
  }
}

module.exports = CursorService;

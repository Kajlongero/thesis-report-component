class AuthenticationService {
  async Login(req, res, data) {
    console.log("Hello!!");

    res.statusCode = 202;
  }
  async Signup(req, res, data) {}
  async ResetPassword(req, res, data) {}
  async ConfirmAccount(req, res, data) {}
  async RecoverPassword(req, res, data) {}
}

module.exports = AuthenticationService;

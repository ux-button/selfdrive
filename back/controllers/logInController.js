const passport = require("passport");

const logInController = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(401)
        .json({ isAuthenticated: false, error: "Log-in failed. No such user" });
    }
    req.logIn(user, (err) => {
      console.log("Logged in successfull", req.user, user);
      return res.status(200).json({
        isAuthenticated: true,
        user: user.id,
        username: user.username,
      });
    });
  })(req, res, next);
};

module.exports = { logInController };

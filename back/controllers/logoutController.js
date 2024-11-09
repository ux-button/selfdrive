const logoutController = (req, res, next) => {
  console.log("I am working");
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.clearCookie("connect.sid");

    res.status(200).end();
  });
};

module.exports = { logoutController };

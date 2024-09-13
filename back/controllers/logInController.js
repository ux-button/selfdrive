const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

const logInController = (req, res) => {
  console.log("Logged in", req.isAuthenticated());
  res.status(201).end();
};

module.exports = { logInController };

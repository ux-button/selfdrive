require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const app = express();

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

passport.use(new LocalStrategy(async (username, password, done) => {}));
passport.serializeUser();
passport.deserializeUser();

app.get("/log-in", (req, res) => {});

app.listen(5123, () => console.log("Server running on port 5123..."));

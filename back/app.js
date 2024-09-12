require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const app = express();

app.listen(5123, () => console.log("Server running on port 5123..."));

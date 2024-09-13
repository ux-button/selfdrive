require("dotenv").config();

const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");

// Configs
const passport = require("./config/passportConfig");

// Controllers
const { signUpController } = require("./controllers/signUpController");
const { logInController } = require("./controllers/logInController");

const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));
app.use(express.json());

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

app.post("/log-in", passport.authenticate("local"), logInController);
app.post("/sign-up", signUpController);

app.listen(5123, () => console.log("Server running on port 5123..."));

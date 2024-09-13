require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const cors = require("cors");

// Controllers
const { signUpController } = require("./controllers/signUpController");

const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

//passport.use(new LocalStrategy(async (username, password, done) => {}));
//passport.serializeUser();
//passport.deserializeUser();

app.get("/log-in", (req, res) => {});
app.post("/sign-up", signUpController);

app.listen(5123, () => console.log("Server running on port 5123..."));

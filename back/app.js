require("dotenv").config();

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");

const app = express();

// Configs
const passport = require("./config/passportConfig");
const corsOptions = require("./config/corsConfig");

// Controllers
const { signUpController } = require("./controllers/signUpController");
const { logInController } = require("./controllers/logInController");
const { checkAuth } = require("./controllers/authCheck");

// Routers
const { folderRouter } = require("./routes/folderRouter");
const { fileRouter } = require("./routes/filesRouter");

// Apply middleware
app.use(cors(corsOptions));
app.use(express.json());

// Initialise session
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "cats",
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(passport.session());

// Routers
app.use("/api/folders", folderRouter);
app.use("/api/files", fileRouter);

// End-points
app.post("/log-in", logInController);
app.post("/sign-up", signUpController);
app.get("/auth", checkAuth);

// Server running
app.listen(5123, () => console.log("Server running on port 5123..."));

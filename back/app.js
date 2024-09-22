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
const { upload } = require("./config/multerConfig");

// Controllers
const { signUpController } = require("./controllers/signUpController");
const { logInController } = require("./controllers/logInController");
const { checkAuth } = require("./controllers/authCheck");
const { getFolder } = require("./controllers/getFoldersController");

// Routers
const { folderRouter } = require("./routes/folderRouter");
const { fileRouter } = require("./routes/filesRouter");

// Apply middleware
app.use(cors(corsOptions));
app.use(express.json());

// Session
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

// Endpoints
app.post("/log-in", logInController);
app.post("/sign-up", signUpController);
app.get("/auth", checkAuth);

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    // Access the uploaded file using req.file
    console.log("Uploaded file:", req.file, req.file.size);

    // Respond with success message
    res.status(200).json({
      message: "File uploaded successfully!",
      file: req.file, // File details
    });
  } catch (error) {
    res.status(500).json({ error: "File upload failed!" });
  }
});

// Server running
app.listen(5123, () => console.log("Server running on port 5123..."));

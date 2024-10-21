const { Router } = require("express");
const fileRouter = Router();

// Multer config
const { upload } = require("../config/multerConfig");

// Controllers
const { getFilesController } = require("../controllers/getFilesController");
const {
  uploadFiledController,
} = require("../controllers/uploadFilesController");
const { deleteFileController } = require("../controllers/deleteFileController");
const {
  getSingleFileController,
} = require("../controllers/getSingleFileController");
const { shareFileController } = require("../controllers/shareFileController");

// End-points
fileRouter.get("/file/:id", getSingleFileController);
fileRouter.get("/*", getFilesController);

fileRouter.post("/", upload.single("file"), uploadFiledController);
fileRouter.post("/delete", deleteFileController);
fileRouter.post("/share", shareFileController);

module.exports = { fileRouter };

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

// End-points
fileRouter.post("/", upload.single("file"), uploadFiledController);
fileRouter.get("/*", getFilesController);
fileRouter.post("/delete", deleteFileController);

module.exports = { fileRouter };

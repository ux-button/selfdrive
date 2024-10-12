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

// End-points
fileRouter.post("/", upload.single("file"), uploadFiledController);
fileRouter.get("/file/:id", getSingleFileController);
fileRouter.get("/*", getFilesController);
fileRouter.post("/delete", deleteFileController);

module.exports = { fileRouter };

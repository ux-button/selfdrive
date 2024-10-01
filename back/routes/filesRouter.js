const { Router } = require("express");
const fileRouter = Router();

// Multer config
const { upload } = require("../config/multerConfig");

// Controllers
const { getFilesController } = require("../controllers/getFilesController");
const {
  uploadFiledController,
} = require("../controllers/uploadFilesController");

// End-points
fileRouter.post("/", upload.single("file"), uploadFiledController);
fileRouter.get("/*", getFilesController);

module.exports = { fileRouter };

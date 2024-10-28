const { Router } = require("express");
const fileRouter = Router();

// Multer config
const { upload } = require("../config/multerConfig");

// Controllers
const {
  getController,
} = require("../controllers/fileControllers/getController");
const {
  uploadController,
} = require("../controllers/fileControllers/uploadController");
const {
  deleteController,
} = require("../controllers/fileControllers/deleteController");
const {
  getSingleController,
} = require("../controllers/fileControllers/getSingleController");
const {
  setShareLinkController,
} = require("../controllers/fileControllers/setShareLinkController");
const {
  getByShareLinkController,
} = require("../controllers/fileControllers/getByShareLinkController");
const {
  copySharedController,
} = require("../controllers/fileControllers/copySharedController");

// End-points
fileRouter.get("/file/:id", getSingleController);
fileRouter.get("/share/:shareId", getByShareLinkController);
fileRouter.get("/*", getController);

fileRouter.post("/", upload.single("file"), uploadController);
fileRouter.post("/delete", deleteController);
fileRouter.post("/share", setShareLinkController);
fileRouter.post("/copy", copySharedController);

module.exports = { fileRouter };

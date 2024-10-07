const { Router } = require("express");
const folderRouter = Router();

// Controllers
const { getFolders } = require("../controllers/getFoldersController");
const {
  setNewFolderController,
} = require("../controllers/setNewFolderController");
const {
  deleteFolderController,
} = require("../controllers/deleteFolderController");

// Endpoints
folderRouter.post("/", setNewFolderController);
folderRouter.get("/*", getFolders);
folderRouter.post("/delete", deleteFolderController);

module.exports = { folderRouter };

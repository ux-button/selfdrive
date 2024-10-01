const { Router } = require("express");
const folderRouter = Router();

// Controllers
const { getFolders } = require("../controllers/getFoldersController");
const {
  setNewFolderController,
} = require("../controllers/setNewFolderController");

// Endpoints
folderRouter.post("/", setNewFolderController);
folderRouter.get("/*", getFolders);

module.exports = { folderRouter };

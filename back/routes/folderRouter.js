const { Router } = require("express");
const folderRouter = Router();

// Controllers
const { getFolders } = require("../controllers/getFoldersController");
const {
  setNewFolderController,
} = require("../controllers/setNewFolderController");

// Endpoints
folderRouter.get("/*", getFolders);
folderRouter.post("/", setNewFolderController);

module.exports = { folderRouter };

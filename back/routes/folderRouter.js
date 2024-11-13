const { Router } = require("express");
const folderRouter = Router();

// Controllers
const {
  getFolders,
} = require("../controllers/folderControllers/getController");
const {
  setNewController,
} = require("../controllers/folderControllers/setNewController");
const {
  deleteController,
} = require("../controllers/folderControllers/deleteController");

// Validators
const { validatePath } = require("../validators/rootPathValidator");
const { validateFolder } = require("../validators/folderExistanceValidator");

// Endpoints
folderRouter.post("/", validatePath, validateFolder, setNewController);
folderRouter.get("/*", getFolders);
folderRouter.post("/delete", deleteController);

module.exports = { folderRouter };

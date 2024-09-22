const { Router } = require("express");
const fileRouter = Router();

// Controllers
const { getFilesController } = require("../controllers/getFilesController");

fileRouter.get("/", getFilesController);

module.exports = { fileRouter };

const { body } = require("express-validator");
const { prisma } = require("../config/prismaConfig");

// Check if folder already exist
const checkFolderExistance = async (path, folder, user) => {
  try {
    return await prisma.folder.findFirst({
      where: { root: path, name: folder, ownerId: user },
    });
  } catch (err) {
    throw new Error("Database connection failed");
  } finally {
    prisma.$disconnect();
  }
};

// Validator for folder name
const validateFolder = body("folder")
  .escape()
  .custom(async (value, { req }) => {
    // Check if folder name has special words
    if (value.includes("~share")) {
      throw new Error("Unavailable folder name");
    }

    // Unescape after validator .escape()
    const altered = req.body.pathname.replace("&#x2F;", "/");

    // Check if folder already exist
    const response = await checkFolderExistance(altered, value, req.user.id);
    console.log(response);
    if (response) {
      throw new Error("Folder already exists");
    }

    return true;
  });

module.exports = { validateFolder };

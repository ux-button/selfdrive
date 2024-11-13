// Get body validator
const { body } = require("express-validator");
// Connect prisma
const { prisma } = require("../config/prismaConfig");

// Check valid path for user
const checkUserPath = async (path) => {
  return await prisma.folder.findFirst({
    where: { ownerId: req.user.id, root: path },
  });
};

// Validator for pathname
const validatePath = body("pathname")
  .escape()
  .custom(async (value) => {
    checkUserPath(value)
      .then((data) => {
        if (!data) {
          throw new Error("Folder creating in a wrong place");
        }
        return true;
      })
      .catch(() => {
        throw new Error("Database connection failed");
      });
  });

module.exports = { validatePath };

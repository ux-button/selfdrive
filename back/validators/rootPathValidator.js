const { body } = require("express-validator");
const { prisma } = require("../config/prismaConfig");

// Check valid path for user
const checkUserPath = async (path, user) => {
  try {
    return await prisma.folder.findFirst({
      where: { ownerId: user, root: path },
    });
  } catch (err) {
    throw new Error("Database connection failed");
  } finally {
    prisma.$disconnect();
  }
};

// Validator for pathname
const validatePath = body("pathname")
  .escape()
  .custom(async (value, { req }) => {
    // Unescape after alter
    const altered = value.replace("&#x2F;", "/");

    // Validate
    const response = await checkUserPath(altered, req.user.id);

    if (!response) {
      throw new Error("Folder creating in a wrong place");
    }
    return true;
  });

module.exports = { validatePath };

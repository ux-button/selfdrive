const { prisma } = require("../../config/prismaConfig");
const { validationResult } = require("express-validator");

// Query database
const addFolder = async (folderName, root, user) => {
  // Check folder existanse
  await prisma.folder.create({
    data: {
      ownerId: user,
      name: folderName,
      root,
    },
  });
};

const setNewController = (req, res) => {
  // Validation result
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ error: result.errors[0].msg });
  }

  const { folder, pathname } = req.body;
  // Unescape after alter
  const altered = pathname.replace("&#x2F;", "/");
  console.log("In controller", altered);

  addFolder(folder, altered, req.user.id)
    .then(async () => {
      await prisma.$disconnect();
      return res.status(201).end();
    })
    .catch(async (e) => {
      await prisma.$disconnect();
      return res.status(400).json({ error: e });
    });
};

module.exports = { setNewController };

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const setNewFolderController = (req, res) => {
  const { folder, pathname } = req.body;

  // Query database
  const addFolder = async (folderName, root) => {
    // TO DO: Check folder name for unique first
    await prisma.folder.create({
      data: {
        ownerId: req.user.id,
        name: folderName,
        root,
      },
    });
  };

  addFolder(folder, pathname)
    .then(async () => {
      await prisma.$disconnect();
      return res.status(201).end();
    })
    .catch(async (e) => {
      await prisma.$disconnect();
      return res.status(400).json({ error: e });
    });
};

module.exports = { setNewFolderController };

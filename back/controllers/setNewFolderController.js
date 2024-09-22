const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const setNewFolderController = (req, res) => {
  const { folder, pathname } = req.body;

  // Converting pathname
  let rootPath = null;
  if (pathname !== "/") {
    rootPath = pathname.split("/");
    rootPath = rootPath[rootPath.length - 1];
  }

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

  addFolder(folder, rootPath)
    .then(async () => {
      console.log("Folder created", req.user.id, rootPath, folder);
      await prisma.$disconnect();
      return res.status(201).end();
    })
    .catch(async (e) => {
      console.log("Folder have not created", e);
      await prisma.$disconnect();
      return res.status(400).json({ error: e });
    });
};

module.exports = { setNewFolderController };

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get folders frm database
const getFoldersByFolder = async (root, user) => {
  const folders = await prisma.folder.findMany({
    where: { root, ownerId: user },
  });
  return folders;
};

// Controller
const getFolders = (req, res) => {
  // TO DO: Check root existanse first
  const path = req.params;

  let rootFolder = null;
  if (path[0]) {
    rootFolder = path[0].split("/");
    rootFolder = rootFolder[rootFolder.length - 1];
  }

  getFoldersByFolder(rootFolder, req.user.id)
    .then(async (folders) => {
      await prisma.$disconnect();
      return res.status(200).json({ folders });
    })
    .catch(async (e) => {
      await prisma.$disconnect();
      return res.status(400).json({ error: "No such folder" });
    });
};

module.exports = { getFolders };

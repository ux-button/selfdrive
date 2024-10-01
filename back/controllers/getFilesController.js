const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get files from database
const getFiles = async (root, ownerId) => {
  const files = await prisma.file.findMany({
    where: { root, ownerId },
  });

  return files;
};

// Controller
const getFilesController = (req, res, next) => {
  // TO DO: Check root existanse first
  const path = req.params;

  // Replace null and prepare altered path
  let rootFolder = "/";
  if (path[0]) {
    rootFolder = rootFolder + path[0].replaceAll(" ", "%20");
  }

  getFiles(rootFolder, req.user.id)
    .then(async (files) => {
      await prisma.$disconnect();
      return res.status(200).json({ files });
    })
    .catch(async (e) => {
      await prisma.$disconnect();
      // TO DO: Solve how to send undefind
      return res.status(200).json({ files: [], error: "No such folder" });
    });
};

module.exports = { getFilesController };

// Load prisma client
const { prisma } = require("../../config/prismaConfig");
const { getCalculatedSize } = require("../../features/getCalculatedSize");

// Get files from database
const getFiles = async (root, ownerId) => {
  const files = await prisma.file.findMany({
    where: { root, ownerId },
  });

  return files;
};

// Controller
const getController = (req, res, next) => {
  // TO DO: Check root existanse first
  const path = req.params;

  if (!req.user) {
    return res.status(200).end();
  }

  // Replace null and prepare altered path
  let rootFolder = "/";
  if (path[0]) {
    rootFolder = rootFolder + path[0].replaceAll(" ", "%20");
  }

  getFiles(rootFolder, req.user.id)
    .then(async (data) => {
      await prisma.$disconnect();
      const files = data.map((file) => {
        return { ...file, size: getCalculatedSize(file.size), type: "file" };
      });
      return res.status(200).json({ files });
    })
    .catch(async (e) => {
      await prisma.$disconnect();
      // TO DO: Solve how to send undefind
      return res.status(200).json({ files: [], error: "No such folder" });
    });
};

module.exports = { getController };

// Load prisma client
const { prisma } = require("../../config/prismaConfig");

const getFileByShareId = async (shareId) => {
  return await prisma.file.findUnique({
    where: { shareId },
  });
};

const getByShareLinkController = (req, res) => {
  const { shareId } = req.params;

  getFileByShareId(shareId)
    .then(async (file) => {
      await prisma.$disconnect();
      console.log(file);
      return res
        .status(200)
        .json({ name: file.name, size: file.size, link: file.link });
    })
    .catch(async (err) => {
      await prisma.$disconnect();
      return res.status(400).json({ error: "Cannot get file by link" });
    });
};

module.exports = { getByShareLinkController };

// Load prisma client
const { prisma } = require("../../config/prismaConfig");

const copySharedFile = async (name, size, link, ownerId) => {
  await prisma.file.create({
    data: { name, root: "/", size, link, ownerId },
  });
};

const copySharedController = (req, res) => {
  const user = req.user;
  const { fileName, fileSize, fileLink } = req.body;

  copySharedFile(fileName, fileSize, fileLink, user.id)
    .then(async (response) => {
      await prisma.$disconnect();
      console.log(response);
      res.status(200).end();
    })
    .catch(async (err) => {
      await prisma.$disconnect();
      res.status(400).json({ error: "Cannot copy file" });
    });
};

module.exports = { copySharedController };

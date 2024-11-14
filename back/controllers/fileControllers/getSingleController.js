// Prisma config
const { prisma } = require("../../config/prismaConfig");

// Size calculator
const { getCalculatedSize } = require("../../features/getCalculatedSize");

// Get file from database by id
const getFileById = async (id) => {
  return await prisma.file.findUnique({
    where: { id },
  });
};

const getSingleController = async (req, res) => {
  const { id } = req.params;

  getFileById(id)
    .then(async (file) => {
      await prisma.$disconnect();
      const data = { ...file, size: getCalculatedSize(file.size) };
      return res.status(200).json(data);
    })
    .catch(async (err) => {
      console.log("Error", err);
      await prisma.$disconnect();
      return res.status(400).json({ error: "No file found" });
    });
};

module.exports = { getSingleController };

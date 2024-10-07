const { DeleteObjectCommand } = require("@aws-sdk/client-s3");

// Load prisma client
const { prisma } = require("../config/prismaConfig");

// Load S3 configed client
const { s3Client } = require("../config/s3Config");
const { response } = require("express");

// Take storage path from file link

// Delete all files from array from storage

// Find all folders id by parent id
const getAllFoldersId = async (id) => {
  // TO DO cleanup and catch needed
  const { name, root } = await prisma.folder.findUnique({
    where: { id },
  });

  const fullPath = (root + name).replaceAll(" ", "%20");

  const allFolders = await prisma.folder.findMany({
    where: { root: { startsWith: fullPath } },
    select: { id: true },
  });

  // Flattern object into array
  const allFoldersId = [];
  allFolders.map((folder) => allFoldersId.push(folder.id));

  return { allFoldersId, fullPath };
};

// Find all files id and links
const getAllFilesId = async (root) => {
  const response = await prisma.file.findMany({
    where: { root: { startsWith: root } },
  });
  return response;
};

// Find all file links from array of file id's

const deleteFolderController = async (req, res) => {
  const { id } = req.body;
  const result = await getAllFoldersId(id);
  const otherResult = await getAllFilesId(result.fullPath);
  console.log(otherResult);
  res.status(200).end();
};

module.exports = { deleteFolderController };

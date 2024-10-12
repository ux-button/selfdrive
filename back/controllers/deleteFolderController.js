const { DeleteObjectCommand } = require("@aws-sdk/client-s3");

// Load prisma client
const { prisma } = require("../config/prismaConfig");

// Load S3 configed client
const { s3Client } = require("../config/s3Config");

// Find all folders path
const getAllFoldersLinks = async (id) => {
  const { name, root } = await prisma.folder.findUnique({
    where: { id },
  });

  // TO DO replace with null in database
  let fullPath;

  if (root === "/") {
    fullPath = ("/" + name).replaceAll(" ", "%20");
  } else {
    fullPath = (root + "/" + name).replaceAll(" ", "%20");
  }

  return { root, fullPath };
};

// Find all folders by path
const getAllFoldersId = async (path, id) => {
  const allFolders = await prisma.folder.findMany({
    where: {
      OR: [{ root: { startsWith: path } }, { id }],
    },
    select: { id: true },
  });

  return allFolders.map((folder) => {
    return folder.id;
  });
};

// Find all files id and links
const getAllFilesIdAndLinks = async (root) => {
  // Find all ids and links
  const filesIdAndLinks = await prisma.file.findMany({
    where: { root: { startsWith: root } },
    select: { id: true, link: true },
  });

  // Take storage path from file link
  return filesIdAndLinks.map((file) => {
    const modifiedLink = file.link.match(/(?<=filestorage\/).*/)[0];
    return { ...file, link: modifiedLink };
  });
};

// Delete all files from array from storage
const deleteFilesFromStorage = async (files) => {
  for (const file of files) {
    // Prepare params for delete
    const params = {
      Bucket: "filestorage",
      Key: file.link, // Path to file
    };

    // Delete file form database
    const deleteFile = new DeleteObjectCommand(params);
    await s3Client.send(deleteFile);
  }

  return true;
};

// Delete all files from database
const deleteAllFiles = async (files) => {
  for (const file of files) {
    await prisma.file.deleteMany({
      where: { id: file.id },
    });
  }

  return true;
};

// TO DO Delete all folders form database
const deleteAllFolders = async (folders) => {
  for (const folder of folders) {
    console.log(folder);
    await prisma.folder.deleteMany({
      where: { id: folder },
    });
  }

  return true;
};

const deleteFolderController = async (req, res) => {
  const { id } = req.body;

  try {
    const { root, fullPath } = await getAllFoldersLinks(id);
    const foldersId = await getAllFoldersId(fullPath, id);
    const filesIdAndLinks = await getAllFilesIdAndLinks(fullPath);

    console.log(foldersId, filesIdAndLinks);

    if (filesIdAndLinks) {
      await deleteFilesFromStorage(filesIdAndLinks); // works
      await deleteAllFiles(filesIdAndLinks); // works
    }
    await deleteAllFolders(foldersId); // don't work deep folder remain
  } catch (err) {
    console.log(err);
  }

  console.log("All done");

  res.status(200).end();
};

module.exports = { deleteFolderController };

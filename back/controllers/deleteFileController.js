const { DeleteObjectCommand } = require("@aws-sdk/client-s3");

// Load prisma client
const { prisma } = require("../config/prismaConfig");

// Load S3 configed client
const { s3Client } = require("../config/s3Config");

// Delete file from database
const deleteFilesAndFoldersInDatabase = async (id, ownerId) => {
  await prisma.file.delete({
    where: {
      id,
      ownerId,
    },
  });
};

const deleteFileController = async (req, res) => {
  // Take path from json body
  const { fileName, fileId } = req.body;

  console.log(fileId, fileName);

  // Prepare params for delete
  const params = {
    Bucket: "filestorage",
    Key: fileName, // Path to file
  };

  // Delete file from storage
  try {
    const deleteFile = new DeleteObjectCommand(params);
    const response = await s3Client.send(deleteFile);

    // Delete file from database
    if (response) {
      deleteFilesAndFoldersInDatabase(fileId, req.user.id)
        .then(async () => {
          await prisma.$disconnect;
          console.log("Successfully deleted from DB");
          return res.status(200).end();
        })
        .catch(async (e) => {
          await prisma.$disconnect;
          console.log("File not deleted from DB", e);
          return res.status(400).json({ error: "File not deleted" });
        });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "File not deleted" });
  }
};

module.exports = { deleteFileController };

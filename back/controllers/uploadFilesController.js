const { Upload } = require("@aws-sdk/lib-storage");

// Load prisma client
const { prisma } = require("../config/prismaConfig");

// Load S3 config
const { s3Client } = require("../config/s3Config");

// Configure prisma save link to db
const setFileToDatabase = async (name, root, size, link, ownerId) => {
  await prisma.file.create({
    data: {
      name,
      root,
      size,
      link,
      ownerId,
    },
  });
};

const uploadFiledController = async (req, res) => {
  // Take path from json body appended to formData
  const rootPath = req.body.pathname;

  // Save file to memory
  const file = req.file;

  // Prepare to upload params
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: "filestorage",
      Key: file.originalname, // You can choose how to name the file
      Body: file.buffer, // File data as a stream (Buffer)
      ContentType: file.mimetype,
    },
  });

  // Transfer file to S3 and get the object in return
  const result = await upload.done();

  // Connect uploaded file path
  const fileStorage = process.env.S3_ENDPOINT;
  const fileLinkPath = `${fileStorage.slice(
    0,
    fileStorage.length - 3
  )}/object/public/filestorage/${file.originalname}`;

  // Store the link, name, size in db
  setFileToDatabase(
    file.originalname, // Filename taken from file
    rootPath, // Root path taken from json
    file.size,
    fileLinkPath, // result.Location, // Link to file in supabase
    req.user.id
  )
    .then(async () => {
      await prisma.$disconnect();
      return res.status(201).end();
    })
    .catch(async (err) => {
      await prisma.$disconnect();
    });
};

module.exports = { uploadFiledController };

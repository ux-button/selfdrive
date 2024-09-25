require("dotenv").config();

const { S3Client } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");

const uploadFiledController = async (req, res) => {
  // Configure S3 for Supabase
  const s3Client = new S3Client({
    forcePathStyle: true,
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

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

  // Transfer file to S3
  await upload.done(file);
  // 3. Get the link
  // 4. Store the link, name, size in db

  // try {
  //   // Access the uploaded file using req.file
  //   console.log("Uploaded file:", req.file, req.file.size);

  //   // Respond with success message
  //   res.status(200).json({
  //     message: "File uploaded successfully!",
  //     file: req.file, // File details
  //   });
  // } catch (error) {
  //   res.status(500).json({ error: "File upload failed!" });
  // }
};

module.exports = { uploadFiledController };

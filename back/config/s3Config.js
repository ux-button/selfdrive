require("dotenv").config();
const { S3Client } = require("@aws-sdk/client-s3");

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

module.exports = { s3Client };

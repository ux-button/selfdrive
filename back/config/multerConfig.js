const multer = require("multer");

// Set up the storage destination and filename for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

module.exports = { upload };

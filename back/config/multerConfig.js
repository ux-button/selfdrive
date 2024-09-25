const multer = require("multer");

// Set up the storage destination and filename for uploaded files
const storage = multer.memoryStorage();

// Initialize multer with the storage configuration
const upload = multer({ storage });

module.exports = { upload };

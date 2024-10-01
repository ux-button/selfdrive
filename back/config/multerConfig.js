const multer = require("multer");

// Set up the storage in memory
const storage = multer.memoryStorage();

// Initialize multer with the storage configuration
const upload = multer({ storage });

module.exports = { upload };

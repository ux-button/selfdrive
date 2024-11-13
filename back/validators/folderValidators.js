// Get body validator
const { body } = require("express-validator");

// Validator for new folder name
const validateNewFolder = body("folder")
  .escape()
  .custom((value) => {
    if (value === "~share") {
      return false;
    }
    return true;
  });

module.exports = { validateNewFolder };

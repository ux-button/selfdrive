const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcryptjs");

// Query to database
const queryDataBase = async (username, password) => {
  await prisma.user.create({
    data: {
      username,
      password,
      folder: {
        create: {
          name: username,
          root: null,
        },
      },
    },
  });
};

// Controller
const signUpController = async (req, res) => {
  const { username, password } = req.body;

  // Check empty field
  if (!username || !password) {
    return res.status(400).json({ error: "Empty username or password" });
  }

  // Hash password and save in database
  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      return res.status(400).json("Something went wrong with password");
    }

    // Call database query
    queryDataBase(username, hashedPassword)
      .then(async () => {
        await prisma.$disconnect();
        return res.status(201).json({ message: `Account ${username} created` });
      })
      .catch(async (e) => {
        await prisma.$disconnect();
        return res
          .status(400)
          .json({ error: "Couldn't save data to database" });
      });
  });
};

module.exports = { signUpController };

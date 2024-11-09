const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

const { prisma } = require("../config/prismaConfig");

// Prisma query
const getUser = async (username) => {
  const result = await prisma.user.findFirst({
    where: { username },
  });
  return result;
};
const getUserById = async (id) => {
  const result = await prisma.user.findFirst({
    where: { id },
  });
  return result;
};

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await getUser(username);
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      done(err);
    } finally {
      prisma.$disconnect();
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  } finally {
    prisma.$disconnect();
  }
});

module.exports = passport;

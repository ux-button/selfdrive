// Load prisma client
const { prisma } = require("../config/prismaConfig");

// Get share link
const getShareLink = async (id) => {
  const result = await prisma.file.findFirst({
    where: { id },
    select: { shareLink: true },
  });

  if (!result) {
    return null;
  }

  return result;
};

// Create share link if absent
const createShareLink = async (shareLink, id) => {
  return await prisma.file.update({
    where: { id },
    data: { shareLink },
  });
};

// Controller
const shareFileController = async (req, res) => {
  const { fileId } = req.body;

  try {
    // Get link if it exists
    const { shareLink } = await getShareLink(fileId);
    if (shareLink) {
      return res.status(200).json({ shareLink });
    }

    // Create unique shareLink and save
    const newLink =
      "http://" + "localhost:5173" + "%%share/" + crypto.randomUUID();
    await createShareLink(newLink, fileId);
    return res.status(200).json({ shareLink: newLink });
  } catch (err) {
    prisma.$disconnect();
    return res.status(400).json({ error: "Could not create share link" });
  } finally {
    prisma.$disconnect();
  }
};

module.exports = { shareFileController };

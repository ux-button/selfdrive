// Load prisma client
const { prisma } = require("../../config/prismaConfig");

// Get share link
const getShareLink = async (id) => {
  const result = await prisma.file.findFirst({
    where: { id },
    select: { shareId: true },
  });

  if (!result) {
    return null;
  }

  return result;
};

// Create share link if absent
const createShareLink = async (shareId, id) => {
  return await prisma.file.update({
    where: { id },
    data: { shareId },
    select: {
      shareId: true,
    },
  });
};

// Controller
const setShareLinkController = async (req, res) => {
  const { fileId } = req.body;

  try {
    // Get link if it exists
    const { shareLink } = await getShareLink(fileId);
    if (shareLink) {
      const fullLink =
        "http://" + "localhost:5173" + "/~share/file/" + shareLink;
      return res.status(200).json({ shareLink: fullLink });
    }

    // Create unique shareLink and save
    const newShareId = crypto.randomUUID();
    await createShareLink(newShareId, fileId);
    const fullNewLink =
      "http://" + "localhost:5173" + "/~share/file/" + newShareId;
    return res.status(200).json({ shareLink: fullNewLink });
  } catch (err) {
    prisma.$disconnect();
    return res.status(400).json({ error: "Could not create share link" });
  } finally {
    prisma.$disconnect();
  }
};

module.exports = { setShareLinkController };

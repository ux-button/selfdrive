const checkAuth = (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(201).json({ isAuthenticated: true, user: req.user });
  } else {
    console.log("Auth denied");
    return res
      .status(401)
      .json({ isAuthenticated: false, error: "Access denied" });
  }
};

module.exports = { checkAuth };

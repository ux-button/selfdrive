const checkAuth = (req, res) => {
  if (req.isAuthenticated()) {
    res.status(201).json({ isAuthenticated: true, user: req.user });
  } else {
    res.status(401).json({ isAuthenticated: false, error: "Access denied" });
  }
};

module.exports = { checkAuth };

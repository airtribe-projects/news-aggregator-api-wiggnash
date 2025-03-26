const validateAuthRouteInput = (req, res, next) => {
  const { username, email, password } = req.body;

  if (req.path === "/signup") {
    if (!username || !email || !password) {
      return res.status(400).json({
        message:
          "Missing required fields for signup (username, email, password)",
      });
    }
  } else if (req.path === "/login") {
    if ((!username && !email) || !password) {
      return res.status(400).json({
        message:
          "Missing required fields for login (email or username, and password)",
      });
    }
  }

  next();
};

export default validateAuthRouteInput;

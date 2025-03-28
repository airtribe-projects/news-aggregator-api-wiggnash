import jwt from "jsonwebtoken";

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default validateToken;

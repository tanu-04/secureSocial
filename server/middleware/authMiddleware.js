const jwt = require("jsonwebtoken");
const SECRET_KEY = "secret";

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    req.user = user;
    next(); // Call next() to proceed to the next middleware or route handler
  });
};

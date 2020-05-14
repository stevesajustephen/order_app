const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("access denied , no token provided");
  try {
    const decoded = jwt.verify(token, config.get("privateKey"));
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send("invalid token");
  }
}

module.exports = auth;

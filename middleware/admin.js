function admin(req, res, next) {
  if (!req.user.isAdmin) return res.status("401").send("not an admin");
  next();
}

module.exports = admin;

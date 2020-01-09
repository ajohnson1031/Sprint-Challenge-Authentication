module.exports = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password)
    res
      .status(400)
      .json({ message: "Username and Password are both required fields." });
  else next();
};

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const users = require("../database/usersModel.js");
const credentials = require("./checkCreds.js");
const jwt = require("jsonwebtoken");
const secrets = require("../config");

router.post("/register", credentials, async (req, res) => {
  const { username, password } = req.body;
  req.body.password = bcrypt.hashSync(password, 12);
  // implement registration
  try {
    const newUser = await users.add(req.body);
    console.log(newUser);
    if (newUser)
      res
        .status(201)
        .json({ message: `${username} has been added.`, response: newUser });
  } catch (error) {
    res.status(500).json({ error: "db error: ", error });
  }
});

router.post("/login", credentials, async (req, res) => {
  // implement login
  const { username, password } = req.body;
  try {
    const logUser = await users.findBy(username);

    if (logUser && bcrypt.compareSync(password, logUser.password)) {
      const token = genToken(logUser);
      res.status(200).json({ message: "You are now logged in.", token: token });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "db error: ", error });
  }
});

function genToken(user) {
  const payload = { subject: user.id, username: user.username };
  const options = { expiresIn: "1d" };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;

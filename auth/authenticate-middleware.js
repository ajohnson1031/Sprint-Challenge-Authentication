/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");
const secrets = require("../config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    jwt.verify(authorization, secrets.jwtSecret, function(err, decodedToken) {
      if (err) res.status(401).json({ you: "shall not pass!" });
      else {
        req.token = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Please login." });
  }
};

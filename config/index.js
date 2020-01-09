const bcrypt = require("bcryptjs");

module.exports = {
  jwtSecret: process.env.JWT_SECRET || "BananaFannaFoFanna12!"
};

const db = require("./dbConfig.js");

function findBy(username) {
  return db("users")
    .where({ username })
    .first();
}

function add(user) {
  return db("users").insert(user, ["*"]);
}

module.exports = { findBy, add };

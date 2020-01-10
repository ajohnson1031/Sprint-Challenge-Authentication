const server = require("../api/server.js");
const auth = require("./auth-router.js");
const request = require("supertest");
const bcrypt = require("bcryptjs");
const db = require("../database/dbConfig.js");

describe("endpoint testing", () => {
  describe("testing the login endpoint", () => {
    it("should return a 400 response if both required params are not passed", async () => {
      await request(server)
        .post("/api/auth/login")
        .send({ username: "mxylptlik" })
        .set("Accept", "application/json")
        .expect(400);
    });

    it("should return 404 if the user is not found", async () => {
      await request(server)
        .post("/api/auth/login")
        .send({
          username: "myxptlik",
          password: "kiltpxym"
        })
        .set("Accept", "application/json")
        .expect(404);
    });
  });

  describe("testing the register endpoint", () => {
    it("should return a 400 response if both required params are not passed", async () => {
      await request(server)
        .post("/api/auth/register")
        .send({ username: "rumplestiltskin" })
        .set("Accept", "application/json")
        .expect(400);
    });

    it("should return 201 once user is created", async () => {
      await request(server)
        .post("/api/auth/register")
        .send({
          username: "ajohnson1031",
          password: bcrypt.hashSync("codebooter31", 12)
        })
        .set("Accept", "application/json")
        .expect(201);
    });
  });
});

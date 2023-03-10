const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../modals/user.model");
require("dotenv").config();
const secretkey = process.env.SECRET_KEY;
const adminkey = process.env.ADMIN;
const loginRouter = Router();

loginRouter.post("/", async (req, res) => {
  const { name,email, password } = req?.body;
  let user = await UserModel.findOne({ email });

  if (user) {
    const hash_password = user.password;
    bcrypt.compare(password, hash_password, async (err, result) => {
      if (result) {
        if (name && name == adminkey) {
          jwt.sign({ user }, adminkey, async (err, token) => {
            if (token) {
              return res.send({ token: token, admin: true });
            } else {
              return res.status(401).send({ error: "something went wrong" });
            }
          });
        } else {
          jwt.sign({ user }, secretkey, async (err, token) => {
            if (token) {
              return res.send({ token: token, admin: false });
            } else {
              return res.status(401).send({ error: "something went wrong" });
            }
          });
        }
      } else {
        return res
          .status(401)
          .send({ error: "your password or email is wrong " });
      }
    });
  } else {
    return res.status(401).send({ error: "you are not authorized" });
  }
});
module.exports = { loginRouter };
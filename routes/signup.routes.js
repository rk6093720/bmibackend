const { Router } = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../modals/user.model");
const signuprouter = Router();

signuprouter.post("/", async (req, res) => {
  const {name, email, password } = req?.body;
  const isuser = await UserModel.findOne({ email });
  if (isuser) {
    return res.status(400).send({
      error: "users already exist please try another email",
    });
  }
  bcrypt.hash(password, 4, async (err, hash) => {
    if (err) {
      return res
        .status(400)
        .send({ error: "something went wrong in hash the password" });
    }
    let newuser = await UserModel({
        name,
      email,
      password: hash,
    });
    try {
      await newuser.save();
      return res.send({ msg: "signup successful!" });
    } catch (err) {
      console.log(err.message);
      return res.status(400).send({ error: "signup failed" });
    }
  });
});
module.exports = { signuprouter };
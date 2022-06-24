const express = require("express");
const userRoute = express.Router();
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

userRoute.post("/", async (req, res) => {
  const allUsers = await UserModel.find();
  if (allUsers.find((user) => user.username === req.body.username))
    return res.status(409).send("username already exist");
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const user = new UserModel({
      name: req.body.name,
      username: req.body.username,
      password: hashPassword,
      admin: false,
    });
    const addUser = await user.save();
    res.json(addUser);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

userRoute.get("/", async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.send(users);
  } catch (error) {
    res.json(error);
  }
});

userRoute.get("/:id", async (req, res) => {
  try {
    const promise = await UserModel.findById(req.params.id).select("-password");
    res.send(promise);
  } catch (error) {
    res.send(error);
  }
});

userRoute.post("/login", async (req, res) => {
  const allUsers = await UserModel.find();
  const user = allUsers.find((user) => user.username === req.body.username);

  if (user === undefined)
    return res.send({ status: 404, data: "User not found" });
  try {
    if (await bcrypt.compare(req.body.password, user.password))
      res.status(200).send(user);
    else res.send({ status: 401, data: "Login fail" });
  } catch (error) {
    res.status(500).send("Something went Wrong");
  }
});

module.exports = userRoute;

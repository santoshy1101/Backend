const express = require("express");
const { PostModel } = require("../models/postModel");

const UserRoutes = express.Router();

UserRoutes.get("/", async (req, res) => {
  const use = await PostModel.find();
  res.send(use);
});

UserRoutes.post("/create", async (req, res) => {
  const { title, body, device } = req.body;
  try {
    const new_user = new PostModel({
      title,
      body,
      device,
    });
    await new_user.save();
    res.send("created user");
  } catch (error) {
    console.log(error);
    res.send("error occured while creating user");
  }
});

UserRoutes.patch("/update/:post", async (req, res) => {
  const postid = req.params.postid;

  try {
    await PostModel.findByIdAndUpdate(postid, req.body);
    res.send("sending update req");
  } catch (error) {
    console.log(error);
    res.send("Error occured whie updating");
  }
});

module.exports = { UserRoutes };

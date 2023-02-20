const express = require("express");
const { connection } = require("./config/db");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { PostModel } = require("./models/postModel");
const { UserModel } = require("./models/userRegisterModel");
const { UserRoutes } = require("./routes/user.routes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("App is running");
});

app.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;
  try {
    const new_user = new UserModel({
      name,
      email,
      gender,
      password,
    });

    await new_user.save();
    return res.send("Successfully Registered");
  } catch (error) {
    res.send("Please Register");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email, password });
  if (!user) {
    return res.send({ responce: -1 });
  }
  try {
    const token = await jwt.sign({ email }, process.env.secret);
    return res.send({
      response: "Succesfully",
      token: token,
      userid: user._id,
    });
  } catch (error) {
    console.log(error);
    return res.send({ response: -1 });
  }
});

const authentication = (req, res, next) => {
  if (!req.headers.token) {
    return res.send({ response: "no user found" });
  }
  const user_token = req.headers.token;
  jwt.verify(user_token, process.env.secret, function (err, decoded) {
    if (err) {
      console.log(err);
    }
    next();
  });
};

app.use(authentication);

app.use("/posts", UserRoutes);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Sending Connection Req");
  } catch (err) {
    console.log("Error Occured while Connecting to DB");
  }
  console.log("Server Running at " + process.env.port);
});

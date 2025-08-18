const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerController = async (req, res) => {
  const { email, username, password } = req.body;

  const emailExists = await userModel.findOne({ email });
  if (emailExists) {
    return res.status(409).json({
      message: "Email Already Exists",
    });
  }

  const usernameExists = await userModel.findOne({ username });
  if (usernameExists) {
    return res.status(409).json({
      message: "Username Already Exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    email: email,
    username: username,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET_KEY
  );

  res.cookie("auth_token", token);

  return res.status(201).json({
    message: "User created successfully",
    user: {
      username: username,
      email: email,
    },
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email: email,
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid Email",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET_KEY
  );

  res.cookie("auth_token", token);

  return res.status(200).json({
    message: "Logged In Successfully",
    user: {
      username: user.username,
    },
  });
};

const logoutController = (req, res) => {
  res.clearCookie("auth_token");
  return res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  registerController,
  loginController,
  logoutController
};

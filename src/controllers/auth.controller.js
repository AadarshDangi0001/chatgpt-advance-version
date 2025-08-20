import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getRegisterController = (req, res) => {
  res.render("register");
};

export const postRegisterController = async (req, res) => {
  const { username, email, password } = req.body;

  const isUserExist = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (isUserExist) {
    return res.status(400).json({
      message: "User already exists with this username or email",
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = await userModel.create({
    username: username,
    email: email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token);

  return res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

export const getLoginController = (req, res) => {
  res.render("login");
};


export const postLoginController = async (req, res) => {
  const { identifier, password } = req.body; 2

  const user = await userModel.findOne({
    $or: [
      { email: identifier },
      { username: identifier }
    ]
  });

  if (!user) {
    return res.status(400).json({
      message: "User not found with this username or email",
    });
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token);

  return res.status(200).json({
    message: "Login successful",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token
  });
}

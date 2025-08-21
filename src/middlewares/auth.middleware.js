import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";


export const authUser  = async  (req, res, next)=> {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/auth/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.redirect('/auth/login');
  }
}

export const userLogout = (req, res) => {
  res.clearCookie("token");
  return res.redirect('/auth/login');
}
  
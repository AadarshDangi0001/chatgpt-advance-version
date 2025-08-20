import userModel from "../models/user.model";


export const getRegisterController =  (req, res) => {
  res.render('register');
} 

export const postRegisterController = (req, res) => {
    const { username,gmail, password } = req.body;

    
}
  

export const getLoginController = (req, res) => {
  res.render('login');
}


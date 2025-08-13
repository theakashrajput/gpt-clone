import userModel from '../models/auth.model.js';
import { isEmail, hashPassword, compareHashPassword } from '../utils/services.js';
import { genrateToken } from '../services/auth.service.js';

export const getRegister = (req, res) => {
    res.render("register")
}
export const postRegister = async (req, res) => {
    const { username, email, password } = req.body;
    const isUserExist = await userModel.exists({ $or: [{ username: username }, { email: email }] });
    if (isUserExist) return res.redirect('/register?error= Username or email already exist');
    const newUser = new userModel({
        username: username,
        email: email,
        password: await hashPassword(password)
    });
    const savedUser = await newUser.save();
    const token = genrateToken({ id: savedUser._id });
    res.cookie("accessToken", token);
    res.redirect("/");
};

export const getLogin = (req, res) => {
    res.render("login");
};

export const postLogin = async (req, res) => {
    const { identifier, password } = req.body;
    const searchFeild = (isEmail(identifier)) ? { email: identifier } : { username: identifier };
    const user = await userModel.findOne(searchFeild);
    if (!user || !(await compareHashPassword(password, user.password))) return res.status(401).json({
        message: "Invalid Credentials"
    });
    const token = genrateToken({ id: user._id });
    res.cookie("accessToken", token);
    res.redirect("/");
};
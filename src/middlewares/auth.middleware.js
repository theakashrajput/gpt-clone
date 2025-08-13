import userModel from "../models/auth.model.js";
import { isValidToken } from "../services/auth.service.js";

export const userAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) return res.redirect("/auth/login");
        const decoded = isValidToken(token);
        const user = await userModel.findOne({ _id: decoded });
        if (!user) return res.redirect("/auth/login");
        res.user = user;
        next();
    } catch (err) {
        return res.status(500).json({
            message: "Error: " + err
        })
    }
};
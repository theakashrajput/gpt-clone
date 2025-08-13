import express from 'express';
import { getRegister, postRegister, getLogin, postLogin } from '../controllers/auth.controller.js';

const router = express.Router();

router.route("/register")
    .get(getRegister)
    .post(postRegister)

router.route("/login")
    .get(getLogin)
    .post(postLogin)

export default router;
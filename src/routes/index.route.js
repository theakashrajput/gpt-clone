import express from 'express';
import { userAuthMiddleware } from '../middlewares/auth.middleware.js';
const router = express.Router();


router.get('/', userAuthMiddleware , (req, res)=>{
    res.render("index")
});

export default router;
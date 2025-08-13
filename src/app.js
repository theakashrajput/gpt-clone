import express from 'express';
import indexRoutes from './routes/index.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';


const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRoutes);
app.use("/auth", authRoutes);

export default app;
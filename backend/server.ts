import express, {Express} from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import {v2 as cloudinary} from "cloudinary";
import connectMongoDB from "./config/db";

const app: Express = express();
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_CLOUD,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});

connectMongoDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
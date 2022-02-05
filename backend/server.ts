// express
import express, {Express} from "express";
// mongoDB
import connectMongoDB from "./config/db";
// cloudinary
import {v2 as cloudinary} from "cloudinary";
// middleware
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
// routes
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import categoryRoutes from './routes/category';
import tagRoutes from './routes/tag';

// express
const app: Express = express();

// .env
dotenv.config();

// cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_CLOUD,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});

// mongoDB
connectMongoDB();

// middlewares

app.use(express.json({limit: "5mb"}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors({
    origin: [process.env.CLIENT_URL!]
}));

// routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', tagRoutes);

// express listen to:
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
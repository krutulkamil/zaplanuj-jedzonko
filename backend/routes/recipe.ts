// express
import express from "express";
import {create} from '../controllers/recipe';
import {adminMiddleware} from "../controllers/user";
import {requireSignin} from "../middlewares";
import {uploadImage} from "../controllers/image";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({});
let upload = multer({
    storage
});

// @ts-ignore
router.post('/recipe', requireSignin, adminMiddleware, upload.single("photo"), uploadImage, create);

export default router;
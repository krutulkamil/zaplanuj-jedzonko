import express from "express";
import multer from "multer";

import {uploadImage, getImage, downloadImage} from '../controllers/image';
import {adminMiddleware} from "../controllers/user";
const router = express.Router();

const storage = multer.diskStorage({});
let upload = multer({
    storage
});

// @ts-ignore
router.post('/upload', adminMiddleware, upload.single("photo"), uploadImage);
router.get('/:id', getImage);
router.get('/:id/download', downloadImage);

export default router;
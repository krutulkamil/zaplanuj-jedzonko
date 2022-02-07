import express from "express";
import multer from "multer";

import {uploadPhoto, getPhoto, downloadPhoto} from '../controllers/photo';
const router = express.Router();

const storage = multer.diskStorage({});
let upload = multer({
    storage
});

router.post('/upload', upload.single("myPhoto"), uploadPhoto);
router.get('/:id', getPhoto);
router.get('/:id/download', downloadPhoto);

export default router;
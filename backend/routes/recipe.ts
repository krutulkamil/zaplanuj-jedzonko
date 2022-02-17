// express
import express from "express";
import {create, list, listAllRecipesCategoriesTags, read, remove, update} from '../controllers/recipe';
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
router.get('/recipes', list);
router.post('/recipes-categories-tags', listAllRecipesCategoriesTags);
router.get('/recipe/:slug', read);
// @ts-ignore
router.delete('/recipe/:slug', requireSignin, adminMiddleware, remove);
// @ts-ignore
router.put('/recipe/:slug', requireSignin, adminMiddleware, update);

export default router;
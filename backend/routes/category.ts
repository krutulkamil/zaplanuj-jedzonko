// express
import express from "express";
import {requireSignin} from "../middlewares";
import {adminMiddleware} from "../controllers/user";
import {create, list, read, remove} from '../controllers/category';

const router = express.Router();

// @ts-ignore
router.post('/categories', requireSignin, adminMiddleware, create);
router.get('/categories', list);
router.get('/category/:slug', read);
// @ts-ignore
router.delete('/category/:slug', requireSignin, adminMiddleware, remove);

export default router;
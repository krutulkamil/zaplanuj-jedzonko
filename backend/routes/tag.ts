// express
import express from "express";
import {requireSignin} from "../middlewares";
import {adminMiddleware} from "../controllers/user";
import {create, list, read, remove} from '../controllers/tag';

const router = express.Router();

// @ts-ignore
router.post('/tags', requireSignin, adminMiddleware, create);
router.get('/tags', list);
router.get('/tag/:slug', read);
// @ts-ignore
router.delete('/tag/:slug', requireSignin, adminMiddleware, remove);

export default router;
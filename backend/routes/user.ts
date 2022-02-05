// express
import express from "express";
// user controllers
import {authMiddleware, read} from "../controllers/user";
import {requireSignin} from "../middlewares";

const router = express.Router();

// @ts-ignore
router.get('/profile', requireSignin, authMiddleware, read);

export default router;
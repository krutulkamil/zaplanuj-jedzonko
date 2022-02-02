// express
import express from "express";
// auth controllers
import {register, login, logout} from "../controllers/auth";
import {requireSignin} from "../middlewares";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', requireSignin, logout);

export default router;
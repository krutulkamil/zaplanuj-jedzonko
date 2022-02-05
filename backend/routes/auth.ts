// express
import express from "express";
// auth controllers
import {register, login, logout} from "../controllers/auth";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

export default router;
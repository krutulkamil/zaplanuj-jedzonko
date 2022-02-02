import expressJwt from 'express-jwt';
import dotenv from "dotenv";
dotenv.config();

export const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET!,
    algorithms: ['HS256'],
})
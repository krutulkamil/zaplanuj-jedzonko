import {NextFunction, Request, Response} from "express";
import User from "../models/user";
import mongoose from "mongoose";

interface ReqUser {
    _id: string;
    iat: number;
    exp: number;
}

interface ReqProfile {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string | undefined
    role: number
    __v?: number
}

interface IUserRequest extends Request {
    user: ReqUser;
    profile: ReqProfile;
}

export const read = (req: IUserRequest, res: Response) => {
    req.profile.password = undefined;
    return res.json(req.profile)
}

export const authMiddleware = async (req: IUserRequest, res: Response, next: NextFunction) => {
    const authUserId = req.user?._id;

    User.findById({_id: authUserId}).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "Nie znaleziono użytkownika"
            })
        }
        req.profile = user;
        next();
    });
};

export const adminMiddleware = async (req: IUserRequest, res: Response, next: NextFunction) => {
    const adminUserId = req.user?._id;

    User.findById({_id: adminUserId}).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "Nie znaleziono użytkownika"
            });
        }
        if (user.role !== 1) {
            return res.status(401).json({
                error: "Wstęp wzbroniony!"
            });
        }

        req.profile = user;
        next();
    });
};
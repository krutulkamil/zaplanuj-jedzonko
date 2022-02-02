// express
import {Request, Response} from "express";
// mongoDB User Model
import User, {IUserModel} from "../models/user";
// .env
import dotenv from "dotenv";
// jsonwebtoken
import jwt from "jsonwebtoken";
// login/register helper functions
import {hashPassword, comparePassword} from "../helpers/auth";

dotenv.config();

export const register = async (req: Request, res: Response) => {
    // walidacja danych przy rejestracji
    try {
        const {name, email, password} = req.body;

        if (!name) {
            return res.status(400).json({
                error: "Podaj nazwę użytkownika!"
            });
        }

        if (!email) {
            return res.status(400).json({
                error: "Adres email jest wymagany!"
            })
        }

        if (!password || password.length < 6) {
            return res.status(400).json({
                error: "Hasło jest wymagane i musi mieć conajmniej 6 znaków!"
            })
        }

        type IsUserExists = IUserModel | null;

        const IsNameExists = await User.findOne({name});
        if (IsNameExists) {
            return res.status(400).json({
                error: "Podana nazwa użytkownika już jest zajęta!"
            })
        }

        const IsEmailExist: IsUserExists = await User.findOne({email});
        if (IsEmailExist) {
            return res.status(400).json({
                error: "Użytkownik o podanym adresie email już istnieje!"
            })
        }

        // hashowanie hasła, jeśli podane dane są prawidłowe:
        const hashedPassword = await hashPassword(password);

        // stwórz nowego użytkownika
        try {
            const user = await new User({
                name,
                email,
                password: hashedPassword
            }).save();

            // stwórz token przy rejestracji
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET!, {expiresIn: '7d'});

            // ogranicz wysyłane dane użytkownika
            const {password, role, resetPasswordLink, ...rest} = user._doc;

            // zwróć do użytkownika dane + token
            return res.status(200).json({
                user: rest,
                token
            });

        } catch (error) {
            console.log(error);
        }

    } catch (error) {
        console.log(error)
    }
};

export const login = async (req: Request, res: Response) => {
    // walidacja danych przy logowaniu
    try {
        // email:
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).send({
                message: "Użytkownik o podanym adresie email nie istnieje!"
            });
        }

        // hasło
        const isPasswordMatch = await comparePassword(req.body.password, user.password);
        if (!isPasswordMatch) {
            return res.json(400).json({
                error: "Podane hasło jest nieprawidłowe!"
            });
        }

        // stwórz token przy logowaniu
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET!, {expiresIn: '7d'});

        // ogranicz wysyłane dane użytkownika
        const {password, role, resetPasswordLink, ...rest} = user._doc;

        // zwróć do użytkownika dane + token
        return res.status(200).json({
            user: rest,
            token
        });

    } catch (error) {
        console.log(error);
    }
};
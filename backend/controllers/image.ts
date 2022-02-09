import {NextFunction, Request, Response} from 'express';
import {UploadApiResponse, v2 as cloudinary} from "cloudinary";
import https from "https";
import dotenv from "dotenv";
import Image from '../models/image';
import mongoose from "mongoose";

dotenv.config();

interface ReqImage {
    filename: string;
    format: string;
    sizeInBytes: string;
    _id: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number
}

interface IImageRequest extends Request {
    image: ReqImage;
}

export const uploadImage = async (req: IImageRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Hej! Potrzebujemy tego zdjęcia!"
            });
        }

        let uploadedFile: UploadApiResponse;

        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: "ZaplanujJedzonko",
                resource_type: "image"
            });

        } catch (error) {
            console.log((error as Error).message);

            return res.status(400).json({
                message: "Błąd Cloudinary"
            });
        }

        const {originalname} = req.file;
        const {secure_url, bytes, format} = uploadedFile;

        req.image = await Image.create({
            filename: originalname,
            sizeInBytes: bytes,
            secure_url,
            format
        });

        next();

    } catch (error) {
        console.log((error as Error).message);
        return res.status(500).json({
            message: "Błąd serwera!"
        });
    }
};

export const getImage = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const image = await Image.findById(id);
        if (!image) {
            return res.status(404).json({
                message: "Zdjęcie nie zostało znalezione!"
            });
        }

        const {filename, format, sizeInBytes} = image;

        return res.status(200).json({
            name: filename,
            sizeInBytes,
            format,
            id
        });

    } catch (error) {
        console.log((error as Error).message);
        return res.status(500).json({
            message: "Błąd serwera!"
        })
    }
};

export const downloadImage = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const image = await Image.findById(id);
        if (!image) {
            return res.status(404).json({
                message: "Zdjęcie nie istnieje!"
            });
        }

        https.get(image.secure_url, (imageStream) => imageStream.pipe(res));

    } catch (error) {
        console.log((error as Error).message);
        return res.status(500).json({
            message: "Błąd serwera!"
        });
    }
};
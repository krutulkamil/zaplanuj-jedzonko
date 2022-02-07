import {Request, Response} from 'express';
import {UploadApiResponse, v2 as cloudinary} from "cloudinary";
import https from "https";
import dotenv from "dotenv";
import Photo from '../models/photo';

dotenv.config();

export const uploadPhoto = async (req: Request, res: Response) => {
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

        const photo = await Photo.create({
            filename: originalname,
            sizeInBytes: bytes,
            secure_url,
            format
        });

        res.status(200).json({
            id: photo._id,
            secure_url
        });

    } catch (error) {
        console.log((error as Error).message);
        return res.status(500).json({
            message: "Błąd serwera!"
        });
    }
};

export const getPhoto = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const photo = await Photo.findById(id);
        if (!photo) {
            return res.status(404).json({
                message: "Zdjęcie nie zostało znalezione!"
            });
        }

        const {filename, format, sizeInBytes} = photo;

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

export const downloadPhoto = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const photo = await Photo.findById(id);
        if (!photo) {
            return res.status(404).json({
                message: "Zdjęcie nie istnieje!"
            });
        }

        https.get(photo.secure_url, (photoStream) => photoStream.pipe(res));

    } catch (error) {
        console.log((error as Error).message);
        return res.status(500).json({
            message: "Błąd serwera!"
        });
    }
};
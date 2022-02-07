// mongoDB
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const photoSchema = new Schema({
        filename: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        },
        format: {
            type: String,
            required: true
        },
        sizeInBytes: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

interface DocumentResult<T> {
    _doc: T;
}

export interface IPhotoModel extends DocumentResult<IPhotoModel> {
    filename: string;
    secure_url: string;
    format: string;
    sizeInBytes: string;
}

export default mongoose.model<IPhotoModel>('Photo', photoSchema);
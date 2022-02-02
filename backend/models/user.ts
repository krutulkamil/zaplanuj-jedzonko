// mongoDB
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 24
    },
    role: {
        type: Number,
        default: 0
    },
    resetPasswordLink: {
        data: String,
        default: ""
    }
});

interface DocumentResult<T> {
    _doc: T;
}

export interface IUserModel extends DocumentResult<IUserModel> {
    name: string;
    email: string;
    password: string;
    role: number;
    resetPasswordLink?: string;
}

export default mongoose.model<IUserModel>('User', userSchema);
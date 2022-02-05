// mongoDB
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    slug: {
        type: String,
        trim: true,
        unique: true,
        index: true
    }
});

interface DocumentResult<T> {
    _doc: T;
}

export interface ICategoryModel extends DocumentResult<ICategoryModel> {
    name: string;
    slug: string;
}

export default mongoose.model<ICategoryModel>('Category', categorySchema);
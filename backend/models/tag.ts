// mongoDB
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tagSchema = new Schema({
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

export interface ITagModel extends DocumentResult<ITagModel> {
    name: string;
    slug: string;
}

export default mongoose.model<ITagModel>('Tag', tagSchema);
// mongoDB
import mongoose from "mongoose";
import {IUserModel} from './user';
import {ICategoryModel} from './category';
import {ITagModel} from './tag';
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        type: String,
        trim: true,
        min: 3,
        max: 160,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        index: true
    },
    body: {
        type: {},
        required: true,
        min: 200,
        max: 3000000
    },
    excerpt: {
        type: String,
        max: 1000
    },
    mtitle: {
        type: String,
    },
    mdesc: {
        type: String,
    },
    photo: [{type: mongoose.Schema.Types.ObjectId, ref: 'Photo'}],
    categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true}],
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: true}],
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

}, { timestamps: true });

interface DocumentResult<T> {
    _doc: T;
}

export interface IRecipeModel extends DocumentResult<IRecipeModel> {
    title: string;
    slug: string;
    body: {};
    excerpt: string;
    mtitle: string;
    mdesc: string;
    photo: {};
    categories: ICategoryModel;
    tags: ITagModel;
    postedBy: IUserModel;
}

export default mongoose.model<IRecipeModel>('Recipe', recipeSchema);
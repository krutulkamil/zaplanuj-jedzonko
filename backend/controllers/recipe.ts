import {Request, Response} from "express";
import Recipe from "../models/recipe";
// import Category from '../models/category';
// import Tag from '../models/tag';
// import Image from '../models/image'
import {stripHtml} from "string-strip-html";
import _ from "lodash";
import {smartTrim} from "../helpers/recipe";
import dotenv from "dotenv";
// import mongoose from "mongoose";
import slugify from "slugify";

dotenv.config();

interface IRecipeRequest extends Request {
    image: any;
    user: any
}

export const create = async (req: IRecipeRequest, res: Response) => {

    const {title, body, categories, tags} = req.body;

    if (!title || !title.length) {
        return res.status(400).json({
            error: "Tytuł jest wymagany!"
        });
    }

    if (!body || body.length < 200) {
        return res.status(400).json({
            error: "Treść przepisu musi być dłuższa niż 200 znaków!"
        });
    }

    if (!categories || categories.length === 0) {
        return res.status(400).json({
            error: "Przepis musi posiadać przynajmniej jedną kategorię!"
        });
    }

    if (!tags || tags.length === 0) {
        return res.status(400).json({
            error: "Przepis musi posiadać przynajmniej jeden tag!"
        })
    }

    let recipe = new Recipe();
    recipe.title = title;
    recipe.body = body;
    recipe.excerpt = smartTrim(body, 320, ' ', ' ...');
    recipe.slug = slugify(title).toLowerCase();
    recipe.mtitle = `${title} | ${process.env.APP_NAME}`;
    recipe.mdesc = stripHtml(body.substring(0, 160)).result;
    recipe.postedBy = req.user._id;
    recipe.photo = req.image._id;

    // kategorie & tagi
    let arrayOfCategories = categories && categories.split(',');
    let arrayOfTags = tags && tags.split(',');

    // zapisz przepis i zaktualizuj go o kategorie i tagi
    recipe.save((err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: "Błąd! Nie można zapisać przepisu!"
            });
        }

        Recipe.findByIdAndUpdate(result._id, {$push: {categories: arrayOfCategories}}, {new: true})
            .exec((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: "Błąd! Nie można zapisać przepisu! (Kategorie)"
                    });
                } else {
                    Recipe.findByIdAndUpdate(result?._id, {$push: {tags: arrayOfTags}}, {new: true})
                        .exec((err, result) => {
                            if (err) {
                                return res.status(400).json({
                                    error: "Błąd! Nie można zapisać przepisu! (Tagi)"
                                });
                            } else {
                                res.json(result);
                            }
                        });
                }
            });
    });
};

export const list = async (req: Request, res: Response) => {
    Recipe.find({})
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('photo', '_id secure_url filename')
        .populate('postedBy', '_id name username')
        .select('_id title slug excerpt categories tags postedBy photo createdAt updatedAt')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: 'Nie można pobrać przepisów!'
                });
            } else {
                res.json(data);
            }
        });
};

export const listAllRecipesCategoriesTags = async (req: Request, res: Response) => {};

export const read = async (req: Request, res: Response) => {};

export const remove = async (req: Request, res: Response) => {};

export const update = async (req: Request, res: Response) => {};
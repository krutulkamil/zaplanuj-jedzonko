import {Request, Response} from "express";
import slugify from "slugify";
import Category from "../models/category";

export const create = async (req: Request, res: Response) => {
    const {name} = req.body;
    let slug = slugify(name).toLowerCase();

    let category = new Category({name, slug});

    await category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Ups... coś poszło nie tak"
            });
        }
        res.json(data);
    });
};

export const list = async (req: Request, res: Response) => {
    await Category.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Ups... coś poszło nie tak"
            });
        }
        res.json(data);
    });
};

export const read = async (req: Request, res: Response) => {
    const slug = req.params.slug.toLowerCase();
    await Category.findOne({slug}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Nie ma takiej kategorii."
            });
        }
        res.json(data);
    });
};

export const remove = async (req: Request, res: Response) => {
    const slug = req.params.slug.toLowerCase();
    await Category.findOneAndRemove({slug}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Ups... coś poszło nie tak"
            });
        }
        res.json({
            message: 'Kategoria usunięta!'
        });
    });
};
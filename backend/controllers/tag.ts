import {Request, Response} from "express";
import slugify from "slugify";
import Tag from "../models/tag";

export const create = async (req: Request, res: Response) => {
    const {name} = req.body;
    let slug = slugify(name).toLowerCase();

    let category = new Tag({name, slug});

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
    await Tag.find({}).exec((err, data) => {
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
    await Tag.findOne({slug}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Nie ma takiego tagu."
            });
        }
        res.json(data);
    });
};

export const remove = async (req: Request, res: Response) => {
    const slug = req.params.slug.toLowerCase();
    await Tag.findOneAndRemove({slug}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Ups... coś poszło nie tak"
            });
        }
        res.json({
            message: 'Tag usunięty!'
        });
    });
};
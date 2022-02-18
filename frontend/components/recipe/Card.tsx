import React, {FunctionComponent} from "react";
import {Category, Photo, PostedBy, Recipe, Tag} from "../../types";
import Link from 'next/link';

// _id:        string;
// categories: Category[];
// tags:       Tag[];
// title:      string;
// excerpt:    string;
// slug:       string;
// postedBy:   PostedBy;
// photo:      Photo;
// createdAt:  Date;
// updatedAt:  Date;

interface Props {
    recipe: Recipe;
}

const Card: FunctionComponent<Props> = ({recipe}) => {
    return (
        <div className="card">
            <div className="card-header">
                <div className="profile">
                    <span className="letter">{recipe.postedBy.name[0]}</span>
                </div>
                <div className="card-title-group">
                    <Link href={`/recipes/${recipe.slug}`}>
                        <a>
                            <h5 className="card-title">{recipe.title}</h5>
                        </a>
                    </Link>
                    <div className="card-date">{recipe.updatedAt}</div>
                </div>
            </div>
            <div className="card-header">
                kategorie & tagi
            </div>
            <img className="card-image" src={recipe.photo.secure_url} alt={recipe.title} />
            <div className="card-text">{recipe.excerpt}</div>
        </div>
    );
}

export default Card;
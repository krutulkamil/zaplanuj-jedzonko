import React, {FunctionComponent} from "react";
import {Category, Photo, PostedBy, Recipe, Tag} from "../../types";
import Link from 'next/link';
import moment from 'moment';
import 'moment/locale/pl';

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

const Card: FunctionComponent<Props> = ({recipe}): JSX.Element => {
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
                    <div className="card-date">{moment(recipe.updatedAt).fromNow()}</div>
                </div>
            </div>
            <Link href={`/recipes/${recipe.slug}`}>
                <a>
                    <img className="card-image" src={recipe.photo.secure_url} alt={recipe.title} />
                </a>
            </Link>
            <div className="card-text">{recipe.excerpt}</div>
            <div className="card-button">
                <Link href={`/recipes/${recipe.slug}`}>
                    <a className="btn-secondary-card">Zobacz przepis!</a>
                </Link>
            </div>
        </div>
    );
}

export default Card;
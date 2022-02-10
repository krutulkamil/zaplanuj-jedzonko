import React, { FunctionComponent, useState, useEffect } from "react";
import Link from "next/link";
import Router, {NextRouter, withRouter} from "next/router";
import dynamic from "next/dynamic";
import {getCookie, isAuth} from '../../actions/auth';
import {getCategories, Category} from '../../actions/category';
import {getTags, Tag} from '../../actions/tag';
import {createRecipe} from '../../actions/recipe';
const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});
import {QuillModules, QuillFormats} from "../../helpers/quill";

interface Props {
    router: NextRouter
}

const RecipeCreate: FunctionComponent<Props> = ({router}) => {
    const recipeFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem('recipe')) {
            return JSON.parse(localStorage.getItem('recipe')!)
        } else {
            return false;
        }
    };

    const [categories, setCategories] = useState([] as Category[] | undefined);
    const [tags, setTags] = useState([] as Tag[] | undefined);
    const [body, setBody] = useState(recipeFromLS());
    const [values, setValues] = useState({
        title: "",
        success: "",
        hidePublishButton: false
    });

    useEffect(() => {
        initCategories().then(() => console.log('Pobrano kategorie!'));
        initTags().then(() => console.log('Pobrano tagi!'));
    }, [router]);

    const initCategories = async () => {
        setCategories(await getCategories());
    };

    const initTags = async () => {
        setTags(await getTags());
    };

    const {title, success, hidePublishButton} = values;

    const handlePublish = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('body', body);
        formData.append('title', title);

        // console.log -> formData
        for (const pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }
    };

    const handleBody = (value: string) => {
        setBody(value);
        if (typeof window !== undefined) {
            localStorage.setItem('recipe', JSON.stringify(value));
        }
    };

    const handleInputChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = name === 'photo' ? e.target.files![0] : e.target.value;
        setValues({...values, [name]: value});
    };

    const showCategories = () => {
        return (
            categories && categories.map((cat, idx) => (
               <li key={idx} className="list-element">
                   <input type="checkbox" />
                   <label>{cat.name}</label>
               </li>
            ))
        );
    };

    const showTags = () => {
        return (
            tags && tags.map((tag, idx) => (
                <li key={idx} className="list-element">
                    <input type="checkbox" />
                    <label>{tag.name}</label>
                </li>
            ))
        );
    };

    const createRecipeForm = () => {
        return (
            <form onSubmit={handlePublish}>
                <div>
                    <label className="recipe-label">Tytuł: </label>
                    <input type="text" className="recipe-title" onChange={handleInputChange('title')} value={title}/>
                </div>
                <div className="quill-container">
                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        placeholder="Dodaj coś przepysznego..."
                        value={body}
                        onChange={handleBody}
                    />
                </div>
                <div>
                    <button className="btn-secondary" type="submit">Publikuj!</button>
                </div>
            </form>
        )
    };

    return (
        <div className="recipe-wrapper">
            <div className="recipe-left">
                {createRecipeForm()}
            </div>
            <aside className="recipe-right">
                <h4 className="recipe-headings">Kategorie</h4>
                <hr className="recipe-spacing"/>
                <ul className="recipe-list">{showCategories()}</ul>
                <h4 className="recipe-headings">Tagi</h4>
                <hr className="recipe-spacing"/>
                <ul className="recipe-list">{showTags()}</ul>
            </aside>

        </div>
    )
};

export default withRouter(RecipeCreate);
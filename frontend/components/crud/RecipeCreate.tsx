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
import {BsFillFileEarmarkImageFill, BsFillCheckCircleFill} from "react-icons/bs";
import {toast} from "react-toastify";

interface Props {
    router: NextRouter
}

type photoType = string | Blob;

interface InitialState {
    title: string;
    photo: null | photoType,
    reload: boolean;
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
    const [checkedCategories, setCheckedCategories] = useState([] as string[]);

    const [tags, setTags] = useState([] as Tag[] | undefined);
    const [checkedTags, setCheckedTags] = useState([] as string[]);

    const [body, setBody] = useState(recipeFromLS());
    const [values, setValues] = useState<InitialState>({
        title: "",
        photo: null,
        reload: false
    });

    const {title, photo, reload} = values;
    const token = getCookie('token');

    useEffect(() => {
        initCategories();
        initTags();
    }, [router, reload]);

    const initCategories = async () => {
        setCategories(await getCategories());
    };

    const initTags = async () => {
        setTags(await getTags());
    };

    const handleInputChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = name === 'photo' ? e.target.files![0] : e.target.value;
        setValues({...values, [name]: value});
    };

    const handleBody = (value: string) => {
        setBody(value);
        if (typeof window !== undefined) {
            localStorage.setItem('recipe', JSON.stringify(value));
        }
    };

    const isFormFilled = () => {
        if (!title || !body || !photo || !checkedCategories || !checkedTags) {
            toast.error('Wypełnij wszystkie pola!', {theme: "dark"});
            return false;
        } else {
            return true;
        }
    };

    const handleResetValues = () => {
        setBody("");
        setCategories([]);
        setTags([]);
        setValues({...values, title: "", photo: null, reload: !reload});
    };

    const handleToggleCategory = (category: string) => () => {
        const clickedCategory = checkedCategories.indexOf(category);
        const all = [...checkedCategories];

        if (clickedCategory === -1) {
            all.push(category);
        } else {
            all.splice(clickedCategory, 1);
        }

        setCheckedCategories(all);
    };

    const handleToggleTags = (tag: string) => () => {
        const clickedTag = checkedTags.indexOf(tag);
        const all = [...checkedTags];

        if (clickedTag === -1) {
            all.push(tag);
        } else {
            all.splice(clickedTag, 1);
        }

        setCheckedTags(all);
    };

    const handlePublish = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        formData.append('categories', checkedCategories.join(','));
        formData.append('tags', checkedTags.join(','));
        formData.append('photo', photo!)

        if (isFormFilled()) {
            createRecipe(formData, token)
                .then(handleResetValues);
        }
    };

    const showCategories = () => {
        return (
            categories && categories.map((cat, idx) => (
               <li key={idx} className="list-element">
                   <input onChange={handleToggleCategory(cat._id)} type="checkbox" />
                   <label>{cat.name}</label>
               </li>
            ))
        );
    };

    const showTags = () => {
        return (
            tags && tags.map((tag, idx) => (
                <li key={idx} className="list-element">
                    <input onChange={handleToggleTags(tag._id)} type="checkbox" />
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
                    <button className="btn-secondary btn-publish" type="submit">Publikuj!</button>
                </div>
            </form>
        );
    };

    return (
        <div className="recipe-wrapper">
            <div className="recipe-left">
                {createRecipeForm()}
            </div>
            <aside className="recipe-right">
                <div className="recipe-image">
                    <h4>Zdjęcie przepisu:</h4>
                    <hr/>
                    <label className="btn-image">{photo ? <BsFillCheckCircleFill/> :
                        (
                            <>
                                <BsFillFileEarmarkImageFill/> Dodaj zdjęcie
                            </>
                        )}
                        <input onChange={handleInputChange('photo')} type="file" accept="image/*" hidden/>
                    </label>
                </div>
                <h4 className="recipe-headings">Kategorie:</h4>
                <hr className="recipe-spacing"/>
                <ul className="recipe-list">{showCategories()}</ul>
                <h4 className="recipe-headings">Tagi:</h4>
                <hr className="recipe-spacing"/>
                <ul className="recipe-list">{showTags()}</ul>
            </aside>
        </div>
    )
};

export default withRouter(RecipeCreate);
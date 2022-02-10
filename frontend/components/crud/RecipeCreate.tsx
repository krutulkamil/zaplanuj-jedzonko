import React, { FunctionComponent, useState, useEffect } from "react";
import Link from "next/link";
import Router, {NextRouter, withRouter} from "next/router";
import dynamic from "next/dynamic";
import {getCookie, isAuth} from '../../actions/auth';
import {getCategories} from '../../actions/category';
import {getTags} from '../../actions/tag';
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

    const [body, setBody] = useState(recipeFromLS());
    const [values, setValues] = useState({
        title: "",
        success: "",
        hidePublishButton: false
    });

    useEffect(() => {
        // init categories & tags
    }, [router]);

    const {title, success, hidePublishButton} = values;

    const handlePublish = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('body', body);
        formData.append('title', title);

        // console.log -> formData
        // @ts-ignore
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

    const createRecipeForm = () => {
        return (
            <form onSubmit={handlePublish}>
                <div>
                    <label className="">Tytuł</label>
                    <input type="text" className="" onChange={handleInputChange('title')} value={title}/>
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
        <div>
            <h3>Stwórz nowy przepis</h3>
            {createRecipeForm()}
        </div>
    )
};

export default withRouter(RecipeCreate);
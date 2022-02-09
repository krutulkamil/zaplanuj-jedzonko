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
    const [values, setValues] = useState({
        title: "",
        body: ""
    })

    const {title, body} = values;

    const handlePublish = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleBody = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e)
    };

    const handleInputChange = (value: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [value]: e.target.value});
    };

    const createRecipeForm = () => {
        return (
            <form onSubmit={handlePublish}>
                <div>
                    <label className="">Tytuł</label>
                    <input type="text" className="" onChange={handleInputChange('title')} value={title}/>
                </div>
                <div>
                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        placeholder="Dodaj coś przepysznego..."
                    />
                </div>
            </form>
        )
    };


    return (
        <div>
            <h3>Stwórz nowy przepis</h3>
            {JSON.stringify(router)}
            {createRecipeForm()}
        </div>
    )
};

export default withRouter(RecipeCreate);
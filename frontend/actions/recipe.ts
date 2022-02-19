import {toast} from "react-toastify";
import axios, {AxiosError} from "axios";
import {AllRecipesCategoriesTags} from "../types";

export const createRecipe = async (recipe: any, token: string | undefined) => {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER}/recipe`, recipe, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })
        toast.success(`Dodano nowy przepis!` , {theme: "dark"});
    } catch (error) {
        const err = error as AxiosError;
        toast.error(err.response?.data.error, {theme: "dark"});
    }
};

export const listRecipesWithCategoriesAndTags = async (skip?: number, limit?: number): Promise<AllRecipesCategoriesTags | undefined> => {
    const pagination = {
        limit, skip
    }
    try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER}/recipes-categories-tags`, pagination);
        return data;
    } catch (error) {
        const err = error as AxiosError;
        toast.error(err.response?.data.error, {theme: "dark"});
    }
};
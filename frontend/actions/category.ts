import axios, {AxiosError} from "axios";
import {toast} from "react-toastify";

export const create = async (category: string, token: string | undefined) => {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER}/categories`, {name: category}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        toast.success(`Dodano kategorie: ${category}` , {theme: "dark"});
    } catch (error) {
        const err = error as AxiosError;
        toast.error(err.response?.data.error, {theme: "dark"});
    }
};

export interface Category {
    _id:  string;
    name: string;
    slug: string;
    __v:  number;
}

export const getCategories = async (): Promise<Category[] | undefined> => {
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER}/categories`);
        return data;
    } catch (error) {
        const err = error as AxiosError;
        toast.error(err.response?.data.error, {theme: "dark"});
    }
};

export const singleCategory = async (slug: string) => {
    try {
        await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER}/category/${slug}`,)
    } catch (error) {
        const err = error as AxiosError;
        toast.error(err.response?.data.error, {theme: "dark"});
    }
};

export const removeCategory = async (slug: string, token: string | undefined) => {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_SERVER}/category/${slug}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        toast.success(response, {theme: "dark"});
    } catch (error) {
        const err = error as AxiosError;
        toast.error(err.response?.data.error, {theme: "dark"});
    }
};
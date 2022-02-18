import axios, {AxiosError} from "axios";
import {toast} from "react-toastify";
import {Tag} from "../types";

export const create = async (tag: string, token: string | undefined) => {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER}/tags`, {name: tag}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        toast.success(`Dodano tag: ${tag}` , {theme: "dark"});
    } catch (error) {
        const err = error as AxiosError;
        toast.error(err.response?.data.error, {theme: "dark"});
    }
};

export const getTags = async (): Promise<Tag[] | undefined> => {
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER}/tags`);
        return data;
    } catch (error) {
        const err = error as AxiosError;
        toast.error(err.response?.data.error, {theme: "dark"});
    }
};

export const singleTag = async (slug: string) => {
    try {
        await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER}/tag/${slug}`,)
    } catch (error) {
        const err = error as AxiosError;
        toast.error(err.response?.data.error, {theme: "dark"});
    }
};

export const removeTag = async (slug: string, token: string | undefined) => {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_SERVER}/tag/${slug}`, {
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
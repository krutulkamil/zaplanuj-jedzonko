import {toast} from "react-toastify";
import axios, {AxiosError} from "axios";

export const createRecipe = async (recipe: any, token: string | undefined) => {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER}/categories`, recipe, {
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
import axios, {AxiosError} from "axios";
import {toast} from "react-toastify";

interface AuthUser {
    name?: string;
    email: string;
    password: string;
}

export const login = async (user: AuthUser) => {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER}/login`, user)
        console.log(user);
        toast.success(`Witaj ponownie!` , {theme: "dark"})
    } catch (error) {
        const err = error as AxiosError;
        toast.error(err.response?.data.error, {theme: "dark"});
    }
}

export const register = async (user: AuthUser) => {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER}/register`, user)
        toast.success(`Witamy na pokładzie ${user.name}` , {theme: "dark"})
    } catch (error) {
        const err = error as AxiosError;
        toast.error(err.response?.data.error, {theme: "dark"});
    }
}
import axios, {AxiosError} from "axios";
import {toast} from "react-toastify";
import cookie from 'js-cookie';
import Router from "next/router";
import {AuthUser, User, UserInformation} from "../types";

export const login = async (user: AuthUser) => {
    try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER}/login`, user);
        toast.success(`Witaj ponownie!` , {theme: "dark"});
        authenticate(data, async () => {
            await Router.push('/');
        });
    } catch (error) {
        const err = error as AxiosError;
        toast.error(err.response?.data.error, {theme: "dark"});
    }
};

export const register = async (user: AuthUser) => {
    try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_SERVER}/register`, user);
        toast.success(`Witamy na pokładzie ${user.name}` , {theme: "dark"});
        authenticate(data, async () => {
            await Router.push('/');
        });
    } catch (error) {
        const err = error as AxiosError;
        toast.error(err.response?.data.error, {theme: "dark"});
    }
};

export const logout = async (next: Function) => {
    removeCookie('token');
    localStorage.removeItem('user');
    next();

    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER}/logout`);
        toast.success(data.message, {theme: "dark"});
    } catch (error) {
        const err = error as AxiosError;
        toast.error(err.response?.data.error, {theme: "dark"});
    }
};

export const setCookie = (key: string, value: string) => {
    if (typeof window !== 'undefined') {
        cookie.set(key, value, {
            expires: 1
        });
    }
};

export const removeCookie = (key: string) => {
    if (typeof window !== 'undefined') {
        cookie.remove(key);
    }
};

export const getCookie = (key: string): string | undefined => {
    if (typeof window !== 'undefined') {
        return cookie.get(key);
    }
};

export const setLocalStorage = (key: string, value: UserInformation) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const removeStorage = (key: string) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

export const authenticate = (data: User, next: Function) => {
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
    next();
};

export const isAuth = () => {
    if (typeof window !== 'undefined') {
        const cookieChecked = cookie.get('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user') as string);
            } else {
                return false;
            }
        }
    }
};

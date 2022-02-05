import React, {useState} from 'react';
import {NextPage} from "next";
import Link from 'next/link';
import {toast} from 'react-toastify';
import {FaUser} from 'react-icons/fa';
import Layout from '../../components/Layout';
import {isAuth, register} from '../../actions/auth';
import {SyncOutlined} from "@ant-design/icons";
import Router from "next/router";

interface RegisterState {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    loading: boolean;
}

const RegisterPage: NextPage = () => {
    const [values, setValues] = useState<RegisterState>({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        loading: false
    });

    const {name, email, password, passwordConfirm, loading} = values;

    if (isAuth()) {
        Router.push('/');
    }

    const handleInputChange = (value: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [value]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            toast.error('Podane hasła nie są takie same!', {theme: "dark"});
            return;
        }

        setValues({...values, loading: true});
        await register({name, email, password});
        setValues({
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
            loading: false
        });
    };

    return (
        <Layout title={`Rejestracja | ${process.env.NEXT_PUBLIC_APP_NAME}`}>
            <div className="auth">
                <h1>
                    <FaUser/> Rejestracja
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Nazwa użytkownika</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={handleInputChange('name')}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Adres E-mail</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleInputChange('email')}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Hasło</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handleInputChange('password')}
                        />
                    </div>
                    <div>
                        <label htmlFor="passwordConfirm">Potwierdź hasło</label>
                        <input
                            type="password"
                            id="passwordConfirm"
                            value={passwordConfirm}
                            onChange={handleInputChange('passwordConfirm')}
                        />
                    </div>
                    {loading ? (
                        <SyncOutlined spin className="loading"/>
                    ) : (
                        <input type="submit" value="Zarejestruj się" className="btn"/>
                    )}
                </form>

                <p>Masz już konto?
                    <Link href="/account/login"> Zaloguj się!</Link>
                </p>
            </div>
        </Layout>
    );
};

export default RegisterPage;


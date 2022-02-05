import React, {useState} from 'react';
import {NextPage} from "next";
import Link from 'next/link';
import Layout from '../../components/Layout';
import {FaUser} from 'react-icons/fa';
import {login} from '../../actions/auth';
import {SyncOutlined} from "@ant-design/icons";

interface LoginState {
    email: string;
    password: string;
    loading: boolean;
}

const LoginPage: NextPage = (): JSX.Element => {
    const [values, setValues] = useState<LoginState>({
        email: "",
        password: "",
        loading: false
    });

    const {email, password, loading} = values;

    const handleInputChange = (value: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [value]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setValues({...values, loading: true});
        await login({email, password})
        setValues({
            email: "",
            password: "",
            loading: false
        });
    };

    return (
        <Layout title={`Logowanie | ${process.env.NEXT_PUBLIC_APP_NAME}`}>
            <div className="auth">
                <h1>
                    <FaUser/> Zaloguj się
                </h1>
                <form onSubmit={handleSubmit}>
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
                    {loading ? (
                        <SyncOutlined spin className="loading" />
                    ) : (
                        <input type="submit" value="Zaloguj się" className="btn"/>
                    )}
                </form>

                <p>Nie masz konta?
                    <Link href="/account/register"> Zarejestruj się</Link>

                </p>
            </div>
        </Layout>
    );
};

export default LoginPage;

import {FunctionComponent} from 'react';
import Link from 'next/link';
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'
import {MdFastfood} from 'react-icons/md'
import {isAuth, logout} from "../actions/auth";
import Router from "next/router";
import NextNProgress from "nextjs-progressbar";

const Header: FunctionComponent = (): JSX.Element => {
    return (
        <>
            <header className="header">
                <div className="logo">
                    <Link href="/">
                        <a>
                            <MdFastfood/> {" "}
                            {process.env.NEXT_PUBLIC_APP_NAME}</a>
                    </Link>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link href="/recipes">
                                <a>Przepisy</a>
                            </Link>
                        </li>

                        <li>
                            <Link href="/categories">
                                <a>Kategorie</a>
                            </Link>
                        </li>

                        {isAuth() && isAuth().role === 1 ? (
                            <li>
                                <Link href="/user/admin">
                                    <a>Tablica</a>
                                </Link>
                            </li>
                        ) : (
                            <li>
                                <Link href="/user">
                                    <a>Tablica</a>
                                </Link>
                            </li>
                        )}

                        {isAuth() ? (
                            <li>
                                <a className="btn-secondary btn-icon"
                                   onClick={() => logout(() => Router.replace('/account/login'))}>
                                    <FaSignOutAlt/> Wyloguj
                                </a>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link href="/account/login">
                                        <a className="btn-secondary btn-icon">
                                            <FaSignInAlt/> Zaloguj
                                        </a>
                                    </Link>
                                </li>
                            </>
                        )}

                    </ul>
                </nav>
            </header>
            <NextNProgress
                color="#00AB55"
                height={2}
                showOnShallow={true}
                options={{showSpinner: false}}/>
        </>
    );
};

export default Header;

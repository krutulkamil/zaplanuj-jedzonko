import {FunctionComponent} from 'react';
import Link from 'next/link';
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'
import {MdFastfood} from 'react-icons/md'

const Header: FunctionComponent = (): JSX.Element => {
    return (
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
                    <li>
                        <Link href="/dashboard">
                            <a>Tablica</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/account/login">
                            <a className="btn-secondary btn-icon">
                                <FaSignInAlt/> Zaloguj
                            </a>
                        </Link>
                    </li>

                    <li>
                        <Link href="/account/logout">
                            <a className="btn-secondary btn-icon">
                                <FaSignOutAlt/> Wyloguj
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;

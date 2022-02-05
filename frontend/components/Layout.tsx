import React, {FunctionComponent, ReactNode} from "react";
import Head from 'next/head';
import Header from "./Header"

interface LayoutProps {
    title?: string;
    keywords?: string;
    description?: string
    children: ReactNode
}

const Layout: FunctionComponent<LayoutProps> = ({title, keywords, description, children}): JSX.Element => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description}/>
                <meta name="keywords" content={keywords}/>
            </Head>

            <Header />
            <div className="container">
                {children}
            </div>
        </>
    )
}

export default Layout;
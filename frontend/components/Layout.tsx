import React, {FunctionComponent, ReactNode} from "react";
import Head from 'next/head';
import Header from "./Header"
import {NextRouter, withRouter} from 'next/router';

interface LayoutProps {
    title?: string;
    keywords?: string;
    description?: string;
    imageUrl?: string;
    imageExtension?: string;
    children: ReactNode;
    router: NextRouter;
}

const Layout: FunctionComponent<LayoutProps>
    = ({
           title,
           keywords,
           description,
           imageUrl,
           imageExtension,
           children,
           router
       })
    : JSX.Element => {
    return (
        <>
            <Head>
                <title>{title} | {process.env.NEXT_PUBLIC_APP_NAME}</title>
                <meta name="description" content={description}/>
                <meta name="keywords" content={keywords}/>
                <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DEVELOPMENT_CLIENT}${router.pathname}`}/>
                <meta property="og:title"
                      content={`Moje przepisy oraz inspiracje kulinarne | ${process.env.NEXT_PUBLIC_APP_NAME}`}/>
                <meta property="og:description" content={description}/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={`${process.env.NEXT_PUBLIC_DEVELOPMENT_CLIENT}${router.pathname}`}/>
                {imageUrl && imageExtension ? (
                    <>
                        <meta property="og:image" content={imageUrl}/>
                        <meta property="og:image:secure_url" content={imageUrl}/>
                        <meta property="og:image:type" content={`image/${imageExtension}`}/>
                    </>
                ) : null}

            </Head>

            <Header/>
            <div className="container">
                {children}
            </div>
        </>
    )
}

export default withRouter(Layout);
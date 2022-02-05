import {AppProps} from "next/app";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/react-quill/dist/quill.snow.css';
import '../styles/index.scss';
import Head from "next/head";

export default function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Component {...pageProps} />
            <ToastContainer/>
        </>
    )
}
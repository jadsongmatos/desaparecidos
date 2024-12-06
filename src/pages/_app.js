import Head from "next/head";

import "bootstrap/dist/css/bootstrap.min.css";
//import 'bootstrap-icons/font/bootstrap-icons.min.css';
import "@/styles/globals.css";

import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Encontre Pessoas Desaparecidas no Brasil</title>
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

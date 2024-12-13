import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt">
      <Head>
        <meta name="description" content="Plataforma para buscar e encontrar informações sobre pessoas desaparecidas no Brasil. Sua ajuda pode fazer a diferença." />
        <meta name="keywords" content="desaparecidos, busca de pessoas, encontrar pessoas, Brasil, ajuda" />
        <meta name="viewport" content="viewport-fit=cover" />
        <meta name="description" content="Desaparecidos" />
        <link rel="icon" href="/favicon.ico" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta name="description" content="Desaparecidos" />
        <meta
          property="og:url"
          content="https://github.com/RegisBloemer/desaparecidos"
        />
        <meta property="og:site_name" content="Desaparecidos" />
        <meta property="og:title" content="Desaparecidos" />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:description" content="Desaparecidos" />
        <meta property="og:type" content="website" />
        <meta name="twitter:site_name" content="Desaparecidos" />
        <meta name="twitter:title" content="Desaparecidos" />
        <meta name="twitter:card" content="Desaparecidos" />
        <meta name="twitter:description" content="Desaparecidos" />
        <meta name="twitter:image" content="/favicon.ico" />
        <meta name="image" content="/favicon.ico" />
        <meta name="google-site-verification" content="K6n_i0D944OJIJwD-M5iQ-jy3oAKFS5aTTL3uJOpy9I" />
        <meta name="algolia-site-verification"  content="30E5665362A50A80" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

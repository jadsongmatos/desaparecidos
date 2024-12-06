import React from "react";
import Link from "next/link";
import SwiperComponent from "@/components/SwiperComponent";

const url = `http://${
  process.env.NEXT_PUBLIC_BASE_URL || "desaparecidos2.vercel.app"
}`;

function LocalizacaoNavBar({ selectedPeople }) {
  return (
    <>
      {/* Barra de Navegação */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link href="/" className="navbar-brand">
            Encontre Pessoas Desaparecidas
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Alternar navegação"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link href="/" className="nav-link active" aria-current="page">
                  Início
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#sobre" className="nav-link">
                  Sobre
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#contato" className="nav-link">
                  Contato
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/desaparecidos/1"
                  className="nav-link btn btn-outline-light ms-3"
                >
                  Buscar Desaparecidos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero com SwiperComponent como fundo animado */}
      <header
        className="hero-section text-center text-white d-flex align-items-center justify-content-center position-relative mb-5 pb-5"
        style={{
          height: "70vh",
        }}
      >
        {/* SwiperComponent como fundo */}
        <div className="swiper-background position-absolute top-0 left-0 w-100 h-100 z-0">
          <SwiperComponent selectedPeople={selectedPeople} />
        </div>

        {/* Conteúdo do Hero */}
        <div className="container position-relative px-3">
          <Link href="/desaparecidos/1" passHref>
            <h1 className="display-4 font-weight-bold">
              Ajude a Encontrar Pessoas Desaparecidas
            </h1>
          </Link>
          <p className="lead mb-4 text-shadow">
            Este site reúne informações de pessoas desaparecidas de diversas
            fontes. Para contribuir, entre em contato por e-mail.
          </p>
          <div>
            <Link href="/desaparecidos/1" passHref>
              <button className="btn btn-light btn-lg mt-3 shadow">
                Buscar Desaparecidos
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Seção "O que é este site?" */}
      <section className="container my-5 py-5" id="sobre">
        <h2 className="text-center mb-4">O que é este site?</h2>
        <div className="row">
          <div className="col-md-12 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">
                  Reúne Dados de Outras Plataformas
                </h5>
                <p className="card-text">
                  Este site apenas organiza e exibe informações sobre pessoas
                  desaparecidas, proveniente dos sites www.pc.rs.gov.br e
                  devs.pc.sc.gov.br. Sua participação é importante através do
                  envio de e-mails.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção "Como Funciona" */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">Como Funciona</h2>
          <div className="row">
            <div className="col-md-4 text-center mb-4">
              <div className="icon mb-3">
                <i
                  className="bi bi-search"
                  style={{ fontSize: "2rem", color: "#0d6efd" }}
                ></i>
              </div>
              <h4>Buscar</h4>
              <p>
                Use nossa plataforma para visualizar informações sobre pessoas
                desaparecidas.
              </p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="icon mb-3">
                <i
                  className="bi bi-envelope"
                  style={{ fontSize: "2rem", color: "#0d6efd" }}
                ></i>
              </div>
              <h4>Contribuir</h4>
              <p>
                Envie e-mail para{" "}
                <a href="mailto:jadson.g-matos@outlook.com">
                  jadson.g-matos@outlook.com
                </a>{" "}
                com informações úteis para ajudar na busca.
              </p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="icon mb-3">
                <i
                  className="bi bi-share"
                  style={{ fontSize: "2rem", color: "#0d6efd" }}
                ></i>
              </div>
              <h4>Compartilhar</h4>
              <p>
                Divulgue informações nas redes sociais para aumentar as chances
                de encontrar alguém.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chamada para Ação */}
      <section className="bg-primary text-center text-white py-5">
        <h2 className="display-4 font-weight-bold">Pronto para ajudar?</h2>
        <p className="lead mb-4">
          Junte-se a nós na busca por pessoas desaparecidas. Cada contribuição
          conta!
        </p>
        <Link
          href="mailto:jadson.g-matos@outlook.com"
          className="btn btn-light btn-lg mt-3"
          role="button"
        >
          Entre em Contato
        </Link>
      </section>

      {/* Contribua com o Código-fonte */}
      <section className="text-center my-5 py-5 bg-light">
        <h2 className="display-4 mb-3">Contribua com o Código</h2>
        <p className="lead mb-4">
          O código-fonte deste projeto está disponível no GitHub. Contribua para
          melhorar a plataforma e ajudar mais pessoas. Clique no link abaixo
          para acessar o repositório:
        </p>
        <Link
          href="https://github.com/jadsongmatos/desaparecidos2"
          className="btn btn-outline-primary btn-lg d-inline-flex align-items-center justify-content-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-github me-2" style={{ fontSize: "1.5rem" }}></i>
          Contribua no GitHub
        </Link>
      </section>

      {/* Rodapé */}
      <footer className="bg-dark text-white py-4" id="contato">
        <div className="container">
          <div className="row">
            {/* Informações sobre o site */}
            <div className="col-md-6 mb-3">
              <h5>Sobre Nós</h5>
              <p>
                Nosso objetivo é facilitar a busca por pessoas desaparecidas no
                Brasil, conectando informações e apoiando famílias.
              </p>
            </div>
            {/* Links Úteis */}
            <div className="col-md-3 mb-3">
              <h5>Links Úteis</h5>
              <ul className="list-unstyled">
                <li>
                  <Link href="#sobre" className="text-white">
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link href="#contato" className="text-white">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link href="/privacidade" className="text-white">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/api/feed" className="text-white">
                    Feed RSS
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

// Função getStaticProps para pegar os dados da API
export async function getStaticProps() {
  try {
    const response = await fetch(`${url}/api/desaparecidos?page=1`);
    const data = await response.json();

    return {
      props: {
        selectedPeople: data.data || [], // Se não houver dados, retorna um array vazio
      },
      revalidate: 60, // Revalidar a cada 60 segundos
    };
  } catch (error) {
    console.error("Error fetching data in getStaticProps:", error);
    return {
      props: {
        selectedPeople: [], // Caso haja erro, retorna um array vazio
      },
    };
  }
}

export default LocalizacaoNavBar;

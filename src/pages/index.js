import Link from "next/link";

function LocalizacaoNavBar() {
  return (
    <>
      <header className="text-center py-5 bg-primary text-white">
        <h1>Ajude a Encontrar Pessoas Desaparecidas</h1>
        <p>
          Milhares de pessoas desaparecem todos os anos no Brasil. Sua ajuda
          pode fazer a diferença.
        </p>
      </header>

      <section className="container my-5">
        <h2>O que é este site?</h2>
        <ul>
          <li>
            Plataforma para buscar e encontrar informações sobre pessoas
            desaparecidas no Brasil.
          </li>
          <li>Conecte-se com informações atualizadas e participe da busca.</li>
        </ul>
      </section>

      <section className="text-center my-5">
        <Link href="/desaparecidos/1" className="btn btn-primary btn-lg">
          Ir para a página de desaparecidos
        </Link>
      </section>

      <footer className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p>
                Informações sobre a coleta e uso de dados de desaparecidos,
                incluindo fontes externas e como são atualizados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default LocalizacaoNavBar;

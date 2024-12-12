import { Feed } from "feed";

const url = `http://${
  process.env.NEXT_PUBLIC_BASE_URL
    ? process.env.NEXT_PUBLIC_BASE_URL
    : "desaparecidos2.vercel.app"
}`;

export default async function handler(req, res) {
  try {
    const page = parseInt(req.query.pag || 1, 10);
    const limit = 6;

    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return res.status(400).json({
        error:
          "Os parâmetros 'page' e 'limit' devem ser números inteiros maiores ou iguais a 1.",
      });
    }

    const response = await fetch(
      `${url}/api/desaparecidos?page=${page}&limit=${limit}`
    );
    let data = await response.json();

    // Verifique a estrutura de data.meta
    console.log('Meta:', data.meta);

    let totalPages;

    if (data.meta.totalPages) {
      totalPages = data.meta.totalPages;
    } else if (data.meta.total) {
      totalPages = Math.ceil(data.meta.total / limit);
    } else {
      console.error("A resposta da API não contém 'totalPages' ou 'total'.");
      return res.status(500).json({
        message: "Erro ao obter informações de paginação da API.",
      });
    }

    const feed = new Feed({
      title: "Desaparecidos",
      description: "Lista de pessoas desaparecidas",
      id: url,
      link: url,
      language: "pt-BR",
      copyright: "CC BY-SA",
      updated: new Date(),
      generator: "Next.js + feed",
      // Adiciona o link "self" para indicar a URL atual do feed
      // Remova a propriedade 'feed' se não for suportada pelo pacote 'feed'
    });

    data.data.forEach((item) => {
      const uf = item.location_history?.[0]?.location?.uf || "Estado não informado";
      const city = item.location_history?.[0]?.location?.city || "Cidade não informada";
      const neighborhood = item.location_history?.[0]?.location?.neighborhood || "Bairro não informado";
      const nationality = item.nationality || "Etnia não informada";
      const sex = item.sex || "Sexo não informado";
      const updatedAt = item.updated_at
        ? new Date(item.updated_at).toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "Última atualização não informada";

      const birthday = item.birthday ? new Date(item.birthday) : null;
      const birthdayFormatted = birthday
        ? birthday.toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "Data de nascimento não informada";

      const currentDate = new Date();
      let age = "Idade não informada";
      if (birthday) {
        const ageDiff = currentDate.getFullYear() - birthday.getFullYear();
        const monthDiff = currentDate.getMonth() - birthday.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && currentDate.getDate() < birthday.getDate())
        ) {
          age = ageDiff - 1;
        } else {
          age = ageDiff;
        }
      }

      const visitedAt = item.location_history?.[0]?.visited_at
        ? new Date(item.location_history[0].visited_at)
        : null;

      let timeMissing = "Data de desaparecimento não informada";
      if (visitedAt) {
        const timeDiff = currentDate - visitedAt;
        const daysMissing = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        timeMissing = `${daysMissing} dias`;
      }

      let locationHistoryDescription = "";
      item.location_history?.forEach((loc, index) => {
        const location = loc.location || {};
        const locationDate = loc.visited_at
          ? new Date(loc.visited_at).toLocaleDateString("pt-BR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "Data de visitação não informada";

        locationHistoryDescription += `\nLocalização ${index + 1}: ${
          location.uf || "Estado não informado"
        } ${location.city || "Cidade não informada"} ${
          location.neighborhood || "Bairro não informado"
        } - Visitação: ${locationDate}`;
      });

      feed.addItem({
        title: item.name,
        id: item.id,
        link: `${url}/desaparecidos/1?name=${encodeURIComponent(item.name)}`,
        description: `Nome: ${item.name}.
Idade: ${age} anos.
Desaparecido há: ${timeMissing}.
Última localização conhecida: ${uf} ${city} ${neighborhood}.
Sexo: ${sex}.
Etnia: ${nationality}.
Nascimento: ${birthdayFormatted}.
Última atualização: ${updatedAt}.
Histórico de Localizações: ${locationHistoryDescription}.`,
        date: visitedAt || currentDate,
        image: item.main_photo,
      });
    });

    feed.addCategory("Desaparecidos");

    // Implementação da paginação conforme RFC 5005
    feed.links = [
      { rel: "self", href: `${url}/api/feed?page=${page}` },
      { rel: "first", href: `${url}/api/feed?page=1` },
      { rel: "last", href: `${url}/api/feed?page=${totalPages}` },
    ];

    if (page > 1) {
      feed.links.push({
        rel: "previous",
        href: `${url}/api/feed?page=${page - 1}`,
      });
    }

    if (page < totalPages) {
      feed.links.push({
        rel: "next",
        href: `${url}/api/feed?page=${page + 1}`,
      });
    }

    const acceptHeader = req.headers.accept || "";

    if (acceptHeader.includes("application/atom+xml")) {
      res.setHeader("Content-Type", "application/atom+xml; charset=utf-8");
      res.write(feed.atom1());
    } else if (acceptHeader.includes("application/json")) {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.write(feed.json1());
    } else {
      res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
      res.write(feed.rss2());
    }

    res.end();
  } catch (error) {
    console.error("Erro ao gerar o feed:", error);
    res
      .status(500)
      .json({ message: "Erro ao gerar o feed", error: error.message });
  }
}

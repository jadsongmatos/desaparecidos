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

    const feed = new Feed({
      title: "Desaparecidos",
      description: "Lista de pessoas desaparecidas",
      id: url,
      link: url,
      language: "pt-BR",
      copyright: "CC BY-SA",
      updated: new Date(),
      generator: "Next.js + feed",
      feed: `${url}/api/feed?page=${page}`,
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

      const categories = [
        { name: uf },
        { name: city },
        { name: neighborhood },
      ];

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
        date: new Date(item.updated_at),
        published: visitedAt || currentDate,
        image: item.main_photo,
        guid: item.id,
        category: categories,
      });
    });

    feed.addCategory("Desaparecidos");

    // Calcular total de páginas
    const totalPages = Math.ceil(data.meta.totalPages / limit);
    feed.links = []; // Limpar links existentes

    // URLs para a página anterior e próxima
    const links = [];

    if (page > 1) {
      const prevPageURL = `${url}/api/feed?page=${page - 1}`;
      links.push(`<${prevPageURL}>; rel="previous"`);
    }

    if (page < totalPages) {
      const nextPageURL = `${url}/api/feed?page=${page + 1}`;
      links.push(`<${nextPageURL}>; rel="next"`);
    }

    // Definir o cabeçalho Link conforme RFC 5005
    if (links.length > 0) {
      res.setHeader("Link", links.join(", "));
    }

    const acceptHeader = req.headers.accept || "";

    if (acceptHeader.includes("application/atom+xml")) {
      let atom = feed.atom1();
      // Adicionar links de navegação dentro do feed Atom
      if (links.length > 0) {
        const linkTags = links
          .map((link) => `<link href="${link.match(/<(.*?)>; rel="(.*?)"/)[1]}" rel="${link.match(/rel="(.*?)"/)[1]}" />`)
          .join("\n");
        // Inserir antes da tag </feed>
        atom = atom.replace("</feed>", `${linkTags}\n</feed>`);
      }
      res.setHeader("Content-Type", "application/atom+xml; charset=utf-8");
      res.write(atom);
    } else if (acceptHeader.includes("application/json")) {
      let json = feed.json1();
      // RFC 5005 is not standard for JSON feeds, but you can include pagination links in a custom field
      if (links.length > 0) {
        const jsonData = JSON.parse(json);
        jsonData.links = jsonData.links || [];
        data.links.forEach((link) => jsonData.links.push(link));
        json = JSON.stringify(jsonData, null, 2);
      }
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.write(json);
    } else {
      let rss = feed.rss2();
      // RSS 2.0 doesn't have a standard way for pagination, but you can include custom namespaces or elements
      // Here, we'll add pagination links as custom elements
      if (links.length > 0) {
        const pagination = links
          .map((link) => `<atom:link href="${link.match(/<(.*?)>; rel="(.*?)"/)[1]}" rel="${link.match(/rel="(.*?)"/)[1]}" />`)
          .join("\n");
        // Insert after <channel> opening tag
        rss = rss.replace(
          "<channel>",
          `<channel>\n  ${pagination}`
        );
      }
      res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
      res.write(rss);
    }

    res.end();
  } catch (error) {
    console.error("Erro ao gerar o feed:", error);
    res
      .status(500)
      .json({ message: "Erro ao gerar o feed", error: error.message });
  }
}

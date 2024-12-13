# Projeto Integrador: Casos de Pessoas Desaparecidas no Brasil

Este projeto desenvolvido em **Next.js** tem como objetivo agregar, armazenar e exibir informações sobre pessoas desaparecidas no Brasil. Utilizando o **Prisma** como ORM para gerenciar um banco de dados **PostgreSQL**, o projeto integra-se com APIs externas para buscar dados atualizados e fornece uma interface frontend intuitiva para navegar, filtrar e visualizar detalhes sobre esses indivíduos.

## Visão Geral

O projeto visa criar uma plataforma centralizada para facilitar a busca e o acompanhamento de casos de pessoas desaparecidas no Brasil. Através de uma interface amigável e de um backend robusto, o sistema permite:

- **Agregação de Dados:** Coleta informações de fontes oficiais e APIs externas.
- **Armazenamento Seguro:** Gerenciamento eficiente de dados utilizando PostgreSQL e Prisma.
- **Exibição Informativa:** Interface frontend para visualização detalhada e filtragem de casos.
- **Atualizações Automatizadas:** Integração com feeds RSS/Atom/JSON para manter os dados sempre atualizados.

## Estrutura do Projeto

- **`schema.prisma`**: Define os modelos de banco de dados (`Person`, `Location`, `LocationHistory` e `Image`) com seus respectivos campos e relacionamentos.

- **`next.config.mjs`**: Configurações do Next.js, incluindo domínios permitidos para carregamento de imagens e redirecionamentos.

- **`package.json`**: Gerencia as dependências e scripts do projeto. Principais dependências incluem `prisma`, `next`, `react`, `axios`, `feed`, entre outras bibliotecas de UI e utilitárias.

- **`next-sitemap.config.js`**: Configurações para geração de sitemaps e `robots.txt`, melhorando o SEO do site.

- **Diretórios Principais:**
  - `/api/desaparecidos`: Rota de API principal para buscar e gerenciar dados de pessoas desaparecidas.
  - `/api/feed`: Gera feeds RSS/Atom/JSON para sindicação de dados.
  - `/pages/desaparecidos/[page].jsx`: Página dinâmica que exibe uma lista paginada de pessoas desaparecidas com funcionalidades de filtro.
  - `/pages/index.js`: Página inicial com navegação, seção introdutória e slider interativo.
  - `/components/`: Componentes reutilizáveis como `SwiperComponent` e `ImageWithFallback`.

## Modelos de Dados e Banco de Dados

### Person

Representa um indivíduo desaparecido.

- `id`: Identificador único.
- `name`: Nome completo.
- `birthday`: Data de nascimento.
- `gender`: Gênero (booleano).
- `nationality`: Nacionalidade.
- `tattoo`: Informações sobre tatuagens.
- `main_photo`: URL da foto principal.
- `others`: Outras informações relevantes.
- **Relacionamentos:**
  - `locationHistory`: Histórico de localizações.
  - `images`: Múltiplas imagens relacionadas.

### Location

Armazena dados geográficos.

- `id`: Identificador único.
- `city`: Cidade.
- `uf`: Unidade federativa (estado).
- `country`: País.
- `neighborhood`: Bairro.

### LocationHistory

Rastreamento de locais onde a pessoa foi vista pela última vez.

- `id`: Identificador único.
- `personId`: Relacionamento com `Person`.
- `locationId`: Relacionamento com `Location`.
- `date`: Data da última localização.

### Image

Contém múltiplas URLs de imagens relacionadas a uma pessoa específica.

- `id`: Identificador único.
- `personId`: Relacionamento com `Person`.
- `url`: URL da imagem.

## Funcionalidades do Backend

### `/api/desaparecidos`

**Descrição:**
Rota de API principal para buscar pessoas desaparecidas. Suporta paginação e filtragem por nome, cidade e estado. Integra-se com fontes externas caso o banco de dados local não possua registros suficientes.

**Parâmetros:**

- `page` (padrão: 1): Número da página.
- `limit` (padrão: 6): Número de registros por página.
- `name`: Filtro por nome.
- `city`: Filtro por cidade.
- `state`: Filtro por estado.

**Lógica:**

1. **Consulta Local:**
   - Utiliza consultas do Prisma para buscar resultados paginados e filtrados na tabela `Person`.

2. **Busca Externa:**
   - Se os filtros não forem fornecidos e o banco de dados local não tiver registros suficientes, busca novos dados nas seguintes fontes:
     - `www.pc.rs.gov.br` (Polícia do Rio Grande do Sul)
     - `devs.pc.sc.gov.br` (Polícia de Santa Catarina)
   - **Processamento dos Dados:**
     - RS: Análise de HTML usando `cheerio`.
     - SC: Análise de JSON.
   - **Enriquecimento:**
     - Utiliza as APIs `genderize.io` e `nationalize.io` para adicionar informações de gênero e nacionalidade.
   - **Armazenamento:**
     - Salva novos registros no banco de dados, evitando duplicatas através da função `checkIfPersonExists()` que utiliza similaridade fuzzy com a extensão `pg_trgm` do PostgreSQL.

3. **Resposta:**
   - Retorna um JSON com `data` (lista de pessoas desaparecidas) e `meta` (informações de paginação).

### `/api/feed`

**Descrição:**
Gera um feed RSS/Atom/JSON com dados de pessoas desaparecidas para sindicação.

**Funcionalidade:**

- Busca dados de `/api/desaparecidos`.
- Formata os dados em um feed utilizando a biblioteca `feed`.
- Suporta múltiplos formatos (RSS, Atom, JSON) com base nos cabeçalhos `Accept`.

## Funcionalidades do Frontend

### Página `/desaparecidos/[page].jsx`

**Descrição:**
Página dinâmica que exibe uma lista paginada de pessoas desaparecidas.

**Funcionalidades:**

- **Listagem Paginada:**
  - Exibe registros com controles de paginação para navegar entre páginas.

- **Filtros Dinâmicos:**
  - Integração com a API pública do IBGE para carregar estados e cidades dinamicamente.
  - Permite filtragem por nome, cidade e estado.

- **Detalhes da Pessoa:**
  - Exibe informações como data de nascimento, nacionalidade, gênero, tatuagens e histórico de localizações.

### Página `/index.js`

**Descrição:**
Página inicial do site com navegação e informações introdutórias.

**Componentes:**

- **Barra de Navegação:**
  - Links para diferentes seções do site.

- **Seção Hero:**
  - Introdução ao propósito do site.

- **Fundo Interativo:**
  - Slider (`SwiperComponent`) exibindo pessoas desaparecidas selecionadas.

- **Informações Adicionais:**
  - Explicação sobre o funcionamento do site.
  - Incentivo para contribuições por e-mail.
  - Links para o repositório no GitHub para fomentar contribuições de código.

## Contato

Para mais informações, dúvidas ou sugestões, sinta-se à vontade para entrar em contato:

- **Email:** [jadson.g-matos@outlook.com](mailto:jadson.g-matos@outlook.com)

---

Agradecemos sua colaboração e interesse em tornar este projeto uma ferramenta eficaz no combate ao desaparecimento de pessoas no Brasil. Juntos, podemos fazer a diferença!

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://desaparecidos2.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  additionalPaths: async (config) => [
    await config.transform(config, '/desaparecidos/1'),
  ],
};

module.exports = config;

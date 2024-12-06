/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/desaparecidos',
        destination: '/desaparecidos/1',
        permanent: true,
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'devs.pc.sc.gov.br',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.pc.rs.gov.br',
        port: '',
        pathname: '**',
      },
    ]
  }
};

export default nextConfig;

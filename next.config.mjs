/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'portfolio-mrdgz14.vercel.app',
          },
        ],
        destination: 'https://www.mateordgz.dev/:path*',
        permanent: true,
      },
      {
        source: '/proyectos/ombu-cafe',
        destination: '/proyectos/bruma-cafe',
        permanent: true,
      },
      {
        source: '/proyectos/aster-automoviles',
        destination: '/proyectos/astra',
        permanent: true,
      },
    ]
  },
}

export default nextConfig

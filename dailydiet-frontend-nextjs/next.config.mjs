/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // Set to true for a 308 redirect, or false for a 307 redirect
      },
    ];
  },
};

export default nextConfig;

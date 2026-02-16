/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: 'https://ecommerce.routemisr.com/api/v1',
  },
};

export default nextConfig;

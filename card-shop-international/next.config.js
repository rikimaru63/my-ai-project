/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
    unoptimized: true,
  },
  output: 'export',
  basePath: '/card-shop-international',
  assetPrefix: '/card-shop-international',
}

export default nextConfig
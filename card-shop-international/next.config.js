/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
    unoptimized: true,
  },
  output: 'export',
  basePath: '/my-ai-project',
}

export default nextConfig
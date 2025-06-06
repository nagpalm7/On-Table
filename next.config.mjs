/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: '',
  basePath: '',
  logger: {
    level: 'info',
    // You can add more logger options here if needed
    timestamp: true,
    color: true,
    db: true
  }
};

export default nextConfig;
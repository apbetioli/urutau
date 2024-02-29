/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '**.vercel.app',
      },
    ],
  },
}

export default nextConfig

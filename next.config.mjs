/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'urutau-**.vercel.app',
      },
    ],
  },
}

export default nextConfig

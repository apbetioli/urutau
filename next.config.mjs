/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'urutau.s3.amazonaws.com',
      },
    ],
  },
}

export default nextConfig

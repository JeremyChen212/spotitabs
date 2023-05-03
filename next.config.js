/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SPOTIFY_CLIENT: process.env.SPOTIFY_CLIENT_ID,
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // your Next.js configuration
  reactStrictMode: true,
  env: {
    SPOTIFY_CLIENT: process.env.SPOTIFY_CLIENT_ID,
  },
})

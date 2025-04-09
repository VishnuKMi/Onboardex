/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    domains: ['ipfs.io']
  }
}

module.exports = nextConfig

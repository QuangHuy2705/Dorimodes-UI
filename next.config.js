/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    relay: {
      src: '~/',
    },
  },
}

module.exports = nextConfig

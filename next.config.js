/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    locales: ["pl", "en", "vn"],
    defaultLocale: "pl"
  },
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/v1/:path*/',
        destination: 'http://localhost:5000/v1/:path*/',
      },
    ]
  }
}

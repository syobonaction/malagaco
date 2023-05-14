/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ['en-US', 'es-ES'],
        defaultLocale: 'en-US',
        localeDetection: false,
    },
    images: {
        domains: [
            "lh3.googleusercontent.com"
        ]
    }
}

module.exports = nextConfig

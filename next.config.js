/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['discogs.com', 'i.discogs.com', 'i.pravatar.cc'],
        allowFutureImage: true
    },
    experimental: {
        esmExternals: true
    }
};

module.exports = nextConfig;

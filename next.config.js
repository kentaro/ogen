/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        serverComponentsExternalPackages: ['@vercel/og']
    }
};

module.exports = nextConfig; 
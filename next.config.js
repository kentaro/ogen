/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        serverComponentsExternalPackages: ['@vercel/og'],
        serverActions: {
            bodySizeLimit: '10mb'
        }
    }
};

module.exports = nextConfig; 
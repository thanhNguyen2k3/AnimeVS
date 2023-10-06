/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        loader: 'cloudinary',
        path: 'https://res.cloudinary.com/dkyhn68qq/image/upload',
    },
};

module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXTAUTH_SECRET: 'This is an example',
        GOOGLE_ID: '488893324329 - ceh1spjb11mfkjhdt7toghr55tgkamnb.apps.googleusercontent.com',
        GOOGLE_SECRET: 'GOCSPX - XtGQwJDJezOrcybvq - pUbDeBUFlh',
        NEXTAUTH_URL: 'http://localhost:3000',
        NEXT_URL: 'http://localhost:3000',
        VERCEL_URL: 'https://anime-vs.vercel.app',
        DATABASE_URL: 'postgresql://postgres:bpivIECW0oepIuXq@db.tbxrlogvaaogawkgsazj.supabase.co:5432/postgres',
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://anime-vs.vercel.app/:path*',
            },
        ];
    },
};

module.exports = nextConfig;

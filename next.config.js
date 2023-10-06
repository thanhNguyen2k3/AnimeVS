/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXTAUTH_SECRET: 'This is an example',
        GOOGLE_ID: '488893324329-ceh1spjb11mfkjhdt7toghr55tgkamnb.apps.googleusercontent.com',
        GOOGLE_SECRET: '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',
        NEXTAUTH_URL: 'http://localhost:3000',
        NEXT_URL: 'http://localhost:3000',
        VERCEL_URL: 'https://anime-vs.vercel.app',
        DATABASE_URL: 'postgresql://postgres:bpivIECW0oepIuXq@db.tbxrlogvaaogawkgsazj.supabase.co:5432/postgres',
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;

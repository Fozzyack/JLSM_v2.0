/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async headers() {
        return [
            {
                source: '/api/checkout',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: 'https://m.stripe.com/6',
                    },
                ],
            },
        ];
    },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "www.gravatar.com",
            },
            {
                protocol: "https",
                hostname: "gravatar.com",
            },
        ]
    },
    env: {
        API_URL: process.env.API_URL,
    },
};

export default nextConfig;

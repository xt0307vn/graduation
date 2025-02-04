/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        API_URL: 'http://localhost:8000/',
        GEMINI_API_KEY: 'AIzaSyB3auw1TORmBqDm0RR-QA0TY2OJYNDpDCk',
        OPENAI_API_KEY: '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'
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            },
        ];
    },
    devIndicators: {
        buildActivity: false,
    },
    sassOptions: {
        silenceDeprecations: ['legacy-js-api'],
    }
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        CLERK_FRONTEND_API: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API,
      },
      experimental: {
        serverActions: {
          bodySizeLimit: '20mb',
        },
      },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'edujsgames.s3.eu-north-1.amazonaws.com',
            port: '',
            pathname: '**',
          },
        ],
      },
};

export default nextConfig;

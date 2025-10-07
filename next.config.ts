/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hvlgdwosooallakixufv.supabase.co',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;

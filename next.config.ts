import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',                 // یا فقط همین پروژه‌ات
        // hostname: 'hvlgdwosooallakixufv.supabase.co',
        pathname: '/storage/v1/object/public/**',   // مسیر باکت پابلیک
      },
    ],
  },
};

export default nextConfig;

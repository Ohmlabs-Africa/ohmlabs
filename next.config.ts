import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/solutions',
        destination: '/services',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

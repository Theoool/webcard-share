/** @type {import('next').NextConfig} */
import type { Configuration } from 'webpack'

const nextConfig = {
  // (Optional) Export as a static site
  // See https://nextjs.net.cn/docs/pages/building-your-application/deploying/static-exports#configuration
  // output: 'export', 
  async rewrites() {
    return [
      {
        source: '/rss',
        destination: '/feed.xml',
      },
      {
        source: '/rss.xml',
        destination: '/feed.xml',
      },
      {
        source: '/feed',
        destination: '/feed.xml',
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },
  // Override the default webpack configuration
 
}

module.exports = nextConfig

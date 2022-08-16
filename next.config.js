const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  output: 'standalone'
}

module.exports = withBundleAnalyzer(nextConfig)

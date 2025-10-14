import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true
  },
  experimental: {
    forceSwcTransforms: true,
  },
}

export default nextConfig
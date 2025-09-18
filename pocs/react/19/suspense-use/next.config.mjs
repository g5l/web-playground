import path from 'node:path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly set to avoid workspace root inference warnings in monorepos.
  outputFileTracingRoot: path.join(process.cwd()),
  experimental: {},
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React strict mode for better error handling
    reactStrictMode: true,

    // Optimize for production
    swcMinify: true,

    // PWA support (will be configured in Phase 5)
    // Future: Add next-pwa configuration
}

module.exports = nextConfig

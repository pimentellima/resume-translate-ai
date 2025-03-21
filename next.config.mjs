/** @type {import('next').NextConfig} */
import { fileURLToPath } from 'url'

const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['@aws-sdk'],
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            // Suppress deprecation warnings globally
            process.noDeprecation = true
        }
        return config
    },
}

export default nextConfig

/** @type {import('next').NextConfig} */
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const filename = fileURLToPath(import.meta.url)

const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['@aws-sdk'],
    },
    serverRuntimeConfig: {
        PROJECT_ROOT: dirname(filename),
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

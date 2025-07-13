import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'minio.tienhoangdev.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'minio.tienhoangdev.com',
                port: '',
                pathname: '/**',
            },
            {
                // Add localhost for development
                protocol: 'http',
                hostname: 'localhost',
                port: '*',
                pathname: '/**',
            },
            {
                // For placeholder images if needed
                protocol: 'https',
                hostname: 'placehold.co',
                port: '',
                pathname: '/**',
            }
        ],
    },
};

export default nextConfig;
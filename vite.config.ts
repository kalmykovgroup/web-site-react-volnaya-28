import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import MakeCert from 'vite-plugin-mkcert';
import * as path from 'node:path';

export default defineConfig(({mode}) => {
    // Загружаем переменные окружения
    const env = loadEnv(mode, process.cwd(), '');
    const isDev = mode === 'development';

    // Общие алиасы
    const aliases = {
        '@': path.resolve(__dirname, 'src'),
        '@shared': path.resolve(__dirname, './src/shared'),
        '@entities': path.resolve(__dirname, './src/entities'),
        '@widgets': path.resolve(__dirname, './src/widgets'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@app': path.resolve(__dirname, './src/app'),
        '@ui': path.resolve(__dirname, './src/ui'),
        '@assets': path.resolve(__dirname, './src/ui/assets'),
        '@chartsPage': path.resolve(__dirname, './src/features/chartsPage'),
        '@login': path.resolve(__dirname, './src/features/login'),
        '@scenario': path.resolve(__dirname, './src/features/scenarioEditor'),
    };

    // DEV конфигурация
    if (isDev) {
        return {
            plugins: [react(), MakeCert()],
            base: '/',
            resolve: {alias: aliases},
            server: {
                port: 5173,
                strictPort: true,
                proxy: {
                    '/images': {
                        target: env.VITE_API_URL,
                        changeOrigin: true,
                        secure: false,
                        configure: (proxy) => {
                            proxy.on('proxyRes', (proxyRes, req) => {
                                if (req.url?.endsWith('.svg')) {
                                    proxyRes.headers['content-type'] = 'image/svg+xml; charset=utf-8';
                                }
                            });
                        }
                    },
                },
            },
            build: {
                outDir: 'dist',
                assetsDir: 'assets',
                minify: 'esbuild',
                sourcemap: true,
                chunkSizeWarningLimit: 1000,
                target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
                cssCodeSplit: true,
                cssMinify: true,
            },
            optimizeDeps: {
                include: [
                    'react',
                    'react-dom',
                    'react-router-dom',
                    '@reduxjs/toolkit',
                    'echarts',
                ],
            },
            preview: {
                port: 4173,
                strictPort: true,
            },
        };
    }

    // PROD конфигурация
    return {
        plugins: [react()],
        base: '/',
        resolve: {alias: aliases},
        server: {
            port: 5173,
            strictPort: true,
        },
        build: {
            outDir: 'dist',
            assetsDir: 'assets',
            minify: 'esbuild', // В rolldown-vite лучше использовать esbuild
            sourcemap: false,
            chunkSizeWarningLimit: 1000,
            target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
            cssCodeSplit: true,
            cssMinify: true,
        },
        optimizeDeps: {
            include: [
                'react',
                'react-dom',
                'react-router-dom',
                '@reduxjs/toolkit',
                'echarts',
            ],
        },
        preview: {
            port: 4173,
            strictPort: true,
        },
    };
});
import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import MakeCert from 'vite-plugin-mkcert';
import {VitePWA} from 'vite-plugin-pwa';
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

    // PWA Configuration
    const pwaConfig = VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'favicon-96x96.png', 'apple-touch-icon.png', 'logo.svg', 'og-image.png'],
        manifest: false, // Используем существующий manifest.json
        workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}'],
            runtimeCaching: [
                {
                    urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'google-fonts-cache',
                        expiration: {
                            maxEntries: 10,
                            maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                        },
                        cacheableResponse: {
                            statuses: [0, 200]
                        }
                    }
                },
                {
                    urlPattern: /^https:\/\/api-maps\.yandex\.ru\/.*/i,
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'yandex-maps-cache',
                        expiration: {
                            maxEntries: 50,
                            maxAgeSeconds: 60 * 60 * 24 * 7 // 1 week
                        }
                    }
                },
                {
                    urlPattern: ({url}) => url.pathname.startsWith('/api/'),
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'api-cache',
                        networkTimeoutSeconds: 10,
                        expiration: {
                            maxEntries: 100,
                            maxAgeSeconds: 60 * 60 // 1 hour
                        },
                        cacheableResponse: {
                            statuses: [0, 200]
                        }
                    }
                },
                {
                    urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'images-cache',
                        expiration: {
                            maxEntries: 100,
                            maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
                        }
                    }
                }
            ],
            cleanupOutdatedCaches: true,
            skipWaiting: true,
            clientsClaim: true
        },
        devOptions: {
            enabled: true,
            type: 'module',
            navigateFallback: 'index.html'
        }
    });

    // DEV конфигурация
    if (isDev) {
        return {
            plugins: [react(), MakeCert(), pwaConfig],
            base: '/',
            resolve: {alias: aliases},
            server: {
                port: 5173,
                strictPort: true,
                headers: {
                    // CSP для dev режима: разрешаем Vite HMR + Yandex Maps + Yandex Metrika
                    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://yandex.ru https://api-maps.yandex.ru https://mc.yandex.ru https://mc.yandex.com; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https: https://mc.yandex.ru https://mc.yandex.com; font-src 'self' data: https:; connect-src 'self' ws: wss: https: wss://mc.yandex.com https://mc.yandex.ru https://mc.yandex.com; frame-src https://yandex.ru https://api-maps.yandex.ru https://mc.yandex.com;",
                },
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
        plugins: [react(), pwaConfig],
        base: '/',
        resolve: {alias: aliases},
        server: {
            port: 5173,
            strictPort: true,
        },
        build: {
            outDir: 'dist',
            assetsDir: 'assets',
            minify: 'esbuild',
            sourcemap: false,
            chunkSizeWarningLimit: 1000,
            target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
            cssCodeSplit: true,
            cssMinify: true,
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                                return 'react-vendor';
                            }
                            if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) {
                                return 'redux-vendor';
                            }
                        }
                    },
                },
            },
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
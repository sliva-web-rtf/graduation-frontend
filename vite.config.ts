import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    const apiUrl = env.VITE_API || process.env.VITE_API;

    return {
        plugins: [svgr({ svgrOptions: { exportType: 'default' } }), react()],
        resolve: {
            alias: [{ find: '@', replacement: '/src' }],
        },
        define: {
            __IS_DEV__: JSON.stringify(process.env.VITE_MODE === 'development'),
            __API__: JSON.stringify(apiUrl),
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                },
            },
        },
    };
});

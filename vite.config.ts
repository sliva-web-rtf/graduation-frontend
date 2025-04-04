import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    return {
        plugins: [svgr({ svgrOptions: { exportType: 'default' } }), react()],
        resolve: {
            alias: [{ find: '@', replacement: '/src' }],
        },
        define: {
            __IS_DEV__: JSON.stringify(env.VITE_MODE === 'development'),
            __API__: JSON.stringify(env.VITE_API),
            __PROJECT__: JSON.stringify(env.VITE_PROJECT),
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

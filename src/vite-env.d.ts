/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API: string;
    readonly VITE_MODE: 'development' | 'production';
    readonly VITE_PROJECT: string;
}

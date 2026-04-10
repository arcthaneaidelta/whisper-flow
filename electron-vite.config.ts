import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      lib: {
        entry: resolve(__dirname, 'electron/main.ts'),
        formats: ['cjs']
      },
      rollupOptions: {
        external: ['electron']
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      lib: {
        entry: resolve(__dirname, 'electron/preload.ts'),
        formats: ['cjs']
      }
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'index.html'),
          splash: resolve(__dirname, 'splash.html'),
          widget: resolve(__dirname, 'widget.html'),
        },
      },
    },
  },
});

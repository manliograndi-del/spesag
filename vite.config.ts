import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({command}) => {
  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'dev-html-transform',
        transformIndexHtml(html) {
          if (command === 'serve') {
            return html
              .replace(
                '<script type="module" crossorigin src="./assets/index.js"></script>',
                '<script type="module" src="/src/main.tsx"></script>'
              )
              .replace(
                '<link rel="stylesheet" crossorigin href="./assets/index.css">',
                ''
              );
          }
          return html;
        },
      },
    ],
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'assets/index.js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]',
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

import { defineConfig, loadEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import webExtension from '@samrum/vite-plugin-web-extension';
import svelteSVG from 'vite-plugin-svelte-svg';
import { getManifest } from './src/manifest.js';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      svelte(),
      svelteSVG({
        svgoConfig: {}, // See https://github.com/svg/svgo#configuration
        requireSuffix: false, // Set false to accept '.svg' without the '?component'
      }),
      webExtension({
        manifest: getManifest(Number(2)),
      }),
    ],
    resolve: {
      alias: {
        '~': new URL('./src', import.meta.url).pathname,
      },
    },
  };
});

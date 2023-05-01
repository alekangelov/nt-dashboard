import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';
import solidStyled from 'vite-plugin-solid-styled';

import solidSvg from 'vite-plugin-solid-svg';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    solidPlugin(),
    crx({ manifest }),
    solidSvg(),

    solidStyled({
      filter: {
        include: 'src/**/*.{ts,js,tsx,jsx}',
        exclude: 'node_modules/**/*.{ts,js,tsx,jsx}',
      },
    }),
  ],

  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});

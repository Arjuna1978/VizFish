import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore - tsc checks this before Vite context is fully established
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
   plugins: [react(), viteTsconfigPaths()],
  base: './',
  server: {
    port: 3000,
  },
})

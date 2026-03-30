import { resolve } from 'node:path';
import { defineConfig } from 'vite-plus';

export default defineConfig({
  plugins: [
    {
      name: 'api-dev-middleware',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const requestUrl = req.url ?? '/';
          const host = req.headers.host ?? 'localhost';
          const { pathname } = new URL(requestUrl, `http://${host}`);

          if (
            !pathname.startsWith('/auth') &&
            !pathname.startsWith('/users') &&
            !pathname.startsWith('/search')
          ) {
            next();
            return;
          }

          try {
            const apiServerModule =
              await server.ssrLoadModule('/src/server.ts');
            const nodeAdapterModule = await server.ssrLoadModule(
              '/src/utils/node-http-adapter.ts',
            );

            const request = nodeAdapterModule.toFetchRequest(req, 4000);
            const response = await apiServerModule.handleApiRequest(request);
            await nodeAdapterModule.sendFetchResponse(res, response);
          } catch (error) {
            const message =
              error instanceof Error
                ? error.message
                : 'Failed to handle API request';

            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: message }));
          }
        });
      },
    },
  ],
  build: {
    target: 'esnext',
    sourcemap: true,
    rollupOptions: {
      output: {
        sourcemapPathTransform: relativeSourcePath => {
          return relativeSourcePath;
        },
      },
    },
  },
  server: {
    port: 4001,
    hmr: true,
    sourcemapIgnoreList: () => false,
  },
  esbuild: {
    // sourcemap: 'inline',
  },
  define: {
    __DEV__: JSON.stringify(true),
  },
  optimizeDeps: {
    exclude: ['@ds/db', '@ds/html', '@ds/utils'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@ds/db': resolve(__dirname, '../../packages/db/src'),
      '@ds/html': resolve(__dirname, '../../packages/html/src'),
      '@ds/utils': resolve(__dirname, '../../packages/utils/src'),
    },
    preserveSymlinks: true,
    conditions: ['node', 'development'],
  },
  fmt: {},
  lint: {},
});

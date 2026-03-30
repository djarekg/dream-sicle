import { resolve } from 'node:path';
import { defineConfig } from 'vite-plus';

export default defineConfig({
  resolve: {
    alias: {
      '@ds/core': resolve(__dirname, '../core/src'),
    },
  },
  pack: {
    dts: {
      tsgo: true,
    },
    exports: true,
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
});

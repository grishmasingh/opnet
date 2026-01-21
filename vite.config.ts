import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint2";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [react(), nodePolyfills(), eslint()],
  resolve: {
    alias: {
      global: "global",
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
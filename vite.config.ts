import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint2";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [react(), nodePolyfills(), eslint()],
  resolve: {
    alias: {
      global: "global",
      "@walletconnect-css": path.resolve(
        __dirname,
        "node_modules/@btc-vision/walletconnect/browser/walletconnect.css"
      ),
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
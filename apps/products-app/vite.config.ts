import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "products_app",
      filename: "remoteEntry.js",
      exposes: {
        "./ProductsApp": "./src/App.tsx",
      },
      shared: ["react", "react-dom", "zustand"],
    }),
  ],
  resolve: {
    alias: {
      "@repo/store": resolve(__dirname, "../../packages/store/src"),
      "@repo/ui": resolve(__dirname, "../../packages/ui/src"),
    },
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3002,
    strictPort: true,
    cors: true,
  },
  preview: {
    port: 3002,
    strictPort: true,
    host: true,
    cors: true,
  },
});

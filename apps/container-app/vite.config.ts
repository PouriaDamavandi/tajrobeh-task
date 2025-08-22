import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "container",
      remotes: {
        cart_app: "http://localhost:3001/assets/remoteEntry.js",
        products_app: "http://localhost:3002/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3000,
    strictPort: true,
    cors: true,
  },
  preview: {
    port: 3000,
    strictPort: true,
    cors: true,
  },
});

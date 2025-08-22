import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// vite.config.ts
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "cart_app",
      filename: "remoteEntry.js",
      exposes: {
        "./CartApp": "./src/App.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3001,
    strictPort: true,
    cors: true,
  },
  preview: {
    port: 3001,
    strictPort: true,
    host: true,
    cors: true,
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "products_app",
      filename: "remoteEntry.js",
      // Modules to expose
      exposes: {
        "./products_app": "./src/App.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
});

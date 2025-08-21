import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "cart_app",
      filename: "remoteEntry.js",
      // Modules to expose
      exposes: {
        "./cart_app": "./src/App.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
});

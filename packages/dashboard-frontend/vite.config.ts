import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import { dirname } from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss({
      // 配置 Tailwind CSS v4
      config: path.resolve(__dirname, "tailwind.config.js"),
    })
  ],
  // Ensure Vite resolves index.html relative to this config file
  root: dirname(fileURLToPath(new URL(import.meta.url))),
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // ✅ import the plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ✅ now Vite knows what this is
  ],
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
});

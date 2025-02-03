import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    port: 5173, // or any available port
    open: true,
  },
  build: {
    outDir: "dist",
  },
});

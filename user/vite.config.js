import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      // "/api/admin": {
      //   // Add a proxy for the /admin path
      //   target: "http://localhost:5000", // Target your Express server
      //   changeOrigin: true,
      // },
    },
  },
});

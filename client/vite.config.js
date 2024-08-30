import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxying API requests to the backend server
      "/api/": {
        target: "http://localhost:4001", // The backend server address
        changeOrigin: true, // Needed for virtual hosted sites
      },
    },
  },
});

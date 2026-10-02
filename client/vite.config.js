import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/venues": {
        target: "http://localhost:3000",
      },
      "/events": {
        target: "http://localhost:3000",
      },
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Option A: deployed at the root of Thomas.github.io, so base = "/".
export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three", "@react-three/fiber", "@react-three/drei"],
        },
      },
    },
  },
});

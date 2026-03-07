
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Note: base must be '/' (not './') for SPA routing to work on published URLs.
  // Capacitor handles asset paths differently — keep base as '/' for web builds.
  base: '/',
  build: {
    outDir: 'dist' // Ensuring output directory is 'dist'
  },
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

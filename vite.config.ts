import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    // Honour PORT when a harness assigns one; fall back to 8080 for `npm run dev`.
    port: Number(process.env.PORT) || 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        /*
          Split only the foundational packages, and only ones nothing else in
          node_modules imports back.

          A catch-all `return "vendor"` bucket here produced a *blank site*:
          it swept up Radix's own transitive dependencies, so vendor-radix
          imported vendor and vendor imported vendor-radix. A cycle between
          chunks means one of them evaluates before the other's exports are
          initialised, and Radix died on `React.forwardRef` of an undefined
          React — with a clean build, a passing typecheck and nothing in the
          terminal to suggest anything was wrong.

          Everything not named below is left to Rollup, which derives chunks
          from the real import graph and cannot produce that cycle.

          Naming a chunk here also makes it a *static* dependency of whatever
          references it, which Vite then adds a modulepreload for. Listing
          @supabase produced exactly that: a library reached only from lazy
          routes became a 59 KB gzipped preload on the home page. Removing the
          entry put it back in the async graph where it belongs. Split only
          what genuinely loads on first paint.
        */
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (/[\\/]node_modules[\\/]react-router/.test(id)) return "vendor-router";
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return "vendor-react";
        },
      },
    },
  },
});

import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: resolve(projectRoot, "github-pages"),
  base: "/",
  publicDir: resolve(projectRoot, "public"),
  plugins: [react()],
  resolve: {
    alias: {
      "@": projectRoot,
    },
  },
  build: {
    outDir: resolve(projectRoot, "github-dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(projectRoot, "github-pages/index.html"),
        research: resolve(projectRoot, "github-pages/research/index.html"),
        team: resolve(projectRoot, "github-pages/team/index.html"),
        join: resolve(projectRoot, "github-pages/join/index.html"),
        notFound: resolve(projectRoot, "github-pages/404.html"),
      },
    },
  },
});

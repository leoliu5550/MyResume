import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Determine base path for production builds. Priority:
  // 1) VITE_BASE or BASE_PATH env var (useful locally or in CI)
  // 2) GITHUB_REPOSITORY (set automatically in GitHub Actions as "owner/repo")
  // 3) fallback to "/"
  const defaultBase = "/";
  const envBase = process.env.VITE_BASE || process.env.BASE_PATH;
  const githubRepo = process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}/` : undefined;
  const base = mode === "production" ? (envBase ?? githubRepo ?? defaultBase) : defaultBase;

  return {
    base,
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});

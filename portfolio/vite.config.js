import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const developmentCspCompatibility = {
  name: "development-csp-compatibility",
  transformIndexHtml(html, context) {
    // Vite injects its own HMR client in development; production retains the strict CSP meta policy.
    if (context.server) {
      return html.replace(/\s*<meta http-equiv="Content-Security-Policy"[^>]*\/>/i, "");
    }
    return html;
  },
};

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const base = process.env.GITHUB_ACTIONS === "true" && repositoryName ? `/${repositoryName}/` : "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), developmentCspCompatibility],
  build: {
    sourcemap: false,
    target: "es2020",
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

/**
 * Minimal Vite config:
 * - no style import plugins (avoids rewriting to antd/es/theme/style)
 * - manualChunks to split big vendor bundles
 * - optional visualizer with ANALYZE=1
 */
export default defineConfig(({ mode }) => {
  const shouldAnalyze = Boolean(process.env.ANALYZE);

  const plugins: any[] = [react()];

  if (shouldAnalyze) {
    plugins.push(
      visualizer({
        filename: "dist/stats.html",
        open: false,
        gzipSize: true,
      })
    );
  }

  return {
    server: { host: "::", port: 8080 },
    plugins,
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
    build: {
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes("node_modules")) {
              if (id.includes("react") || id.includes("react-dom")) return "vendor.react";
              if (id.includes("antd")) return "vendor.antd";
              if (id.includes("@ant-design/icons")) return "vendor.antd-icons";
              if (id.includes("html2pdf")) return "vendor.html2pdf";
              if (id.includes("html2canvas")) return "vendor.html2canvas";
              if (id.includes("purify")) return "vendor.purify";
              return "vendor";
            }
          },
        },
      },
    },
  };
});

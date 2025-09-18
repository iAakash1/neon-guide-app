import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import styleImport from "vite-plugin-style-import";
import { visualizer } from "rollup-plugin-visualizer";

/**
 * Vite config (TypeScript)
 * - No lovable plugin
 * - On-demand antd style import
 * - manualChunks to split large vendor bundles
 * - optional visualizer when ANALYZE=1
 */
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";
  const shouldAnalyze = Boolean(process.env.ANALYZE);

  const plugins = [
    react(),
    // on-demand style import for antd
    styleImport({
      libs: [
        {
          libraryName: "antd",
          esModule: true,
          resolveStyle: (name: string) => `antd/es/${name}/style/index`,
        },
      ],
    }),
    // visualizer (only when ANALYZE=1)
    shouldAnalyze &&
      visualizer({
        filename: "dist/stats.html",
        open: false,
        gzipSize: true,
      }),
  ].filter(Boolean);

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      // raise warning threshold a bit while we tune chunking
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

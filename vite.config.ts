import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// don't assume default export shape from plugin; import the module and resolve export safely
import * as styleImportModule from "vite-plugin-style-import";
import { visualizer } from "rollup-plugin-visualizer";

/**
 * Safe helper to obtain the plugin factory from the imported module.
 * Some versions export default, others export named functions.
 */
function resolveStyleImport(pluginModule: any) {
  if (!pluginModule) return null;
  // default export
  if (pluginModule.default) return pluginModule.default;
  // named export common names
  if (pluginModule.styleImport) return pluginModule.styleImport;
  if (pluginModule.createStyleImportPlugin) return pluginModule.createStyleImportPlugin;
  // fallback to the module itself if it's a function
  if (typeof pluginModule === "function") return pluginModule;
  return null;
}

const styleImport = resolveStyleImport(styleImportModule);

/**
 * Vite config (TypeScript)
 * - No lovable plugin
 * - On-demand antd style import (only if plugin loaded)
 * - manualChunks to split big vendor bundles
 * - optional visualizer when ANALYZE=1
 */
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";
  const shouldAnalyze = Boolean(process.env.ANALYZE);

  const plugins: any[] = [react()];

  // add styleImport plugin only if we resolved it
  if (styleImport) {
    try {
      plugins.push(
        styleImport({
          libs: [
            {
              libraryName: "antd",
              esModule: true,
              resolveStyle: (name: string) => `antd/es/${name}/style/index`,
            },
          ],
        })
      );
    } catch (e) {
      // if plugin call fails for any reason, fall back to not using it
      // log to console so you can see it during build
      // eslint-disable-next-line no-console
      console.warn("vite config: styleImport plugin skipped due to error:", e && e.message);
    }
  } else {
    // eslint-disable-next-line no-console
    console.warn("vite config: vite-plugin-style-import not available or has unexpected exports — skipping plugin");
  }

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

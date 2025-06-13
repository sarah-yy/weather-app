import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginSvgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  envDir: "./envs",
  plugins: [
    react(),
    vitePluginSvgr({
      include: "**/*.svg",
      // https://react-svgr.com/docs/options/
      svgrOptions: {
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignore specific warnings
        if (warning.code === "PURE_COMMENT_HAS_SIDE_EFFECTS") return;
        if (warning.message.includes("/*#__PURE__*/")) return;
        // Use default warning behavior for other warnings
        warn(warning);
      },
      output: {
        manualChunks: {
          "react-vendor": [
            "react",
            "react-dom",
          ],
        },
      },
    },
  },
});
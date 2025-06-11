import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginSvgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
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
});
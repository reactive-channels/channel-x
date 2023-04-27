import Vue from "@vitejs/plugin-vue";
import path from "path";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";

export default defineConfig({
  assetsInclude: /\.(pdf|jpg|png|svg)$/,
  resolve: {
    alias: {
      "@assets/": `${path.resolve(__dirname, "./src/playground/assets")}/`,
      "@app/": `${path.resolve(__dirname, "./src/playground/app")}/`,
      "@public/": `${path.resolve(__dirname, "./src/playground/public")}/`,
      "@channel-x/core-channel": `${path.resolve(
        __dirname,
        "../core.channel/src"
      )}/`,
      "@channel-x/vue-channel": `${path.resolve(__dirname, "./src")}/`,
    },
  },
  publicDir: path.resolve(__dirname, "./src/playground/public"),
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "vue-channel",
      fileName: (format) => `index.${format}.js`,
    },
    outDir: path.resolve(__dirname, "./dist"),
    rollupOptions: {
      external: ["vue", "typescript", "@channel-x/core-channel"],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [
    Vue(),
    Components({
      dirs: ["src/playground/app/components"],
    }),
  ],
});

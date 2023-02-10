import path from "path";
import veauryVitePlugins from "veaury/vite/index.js";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [
    // react(),
    veauryVitePlugins({
      type: "react",
      // Configuration of @vitejs/plugin-vue
      // vueOptions: {...},
      // Configuration of @vitejs/plugin-react
      // reactOptions: {...},
      // Configuration of @vitejs/plugin-vue-jsx
      // vueJsxOptions: {...}
    }),
  ],
  resolve: {
    alias: {
      "@assets/": `${path.resolve(__dirname, "./src/playground/assets")}/`,
      "@app/": `${path.resolve(__dirname, "./src/playground/app")}/`,
      "@public/": `${path.resolve(__dirname, "./src/playground/public")}/`,
      "@channel-x/core-channel": `${path.resolve(
        __dirname,
        "../core.channel/src"
      )}/`,
    },
  },
  preview: {
    host: "localhost",
    port: 5173,
    strictPort: true,
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});

import path from "path";
import veauryVitePlugins from "veaury/vite/index.js";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";

const customPlugin = ({ root, write }) => {
  // console.log("root", root);
  return {
    name: "custom-plugin",
    test: /\.(tsx|jsx)$/,
    transform(content, ctx) {
      // console.log("ctx", ctx);
      // Process the content of the file here and extract the relevant information you want

      const store = {};
      const lines = content.split("\n");
      lines.forEach((line) => {
        if (line.includes("Channel.")) {
          const channelName = line.split(" ")[1];
          if (typeof channelName === "string" && channelName) {
            // Get the filename and path from the File metadata
            const fileName = ctx.fileName;
            const filePath = ctx.root;

            // Store the information in the store object
            store[channelName] = { fileName, filePath };
            console.log("store", store);
            globalThis.store = globalThis.store || {};
            globalThis.store = store;
          }
        }
      });

      return { code: content };
    },
  };
};

export default defineConfig({
  plugins: [
    // react(),
    babel(),
    customPlugin({ root: __dirname, write: true }),
    veauryVitePlugins({
      type: "react",
      // Configuration of @vitejs/plugin-vue
      // vueOptions: {...},
      // Configuration of @vitejs/plugin-react
      // reactOptions: {...},
      // Configuration of @vitejs/plugin-vue-jsx
      // vueJsxOptions: {...}
    }),
    // {
    //   name: "swc",
    //   test: /\.(tsx|jsx)$/,
    //   transform(content, ctx) {
    //     const swc = require("swc");
    //     const output = swc.transformSync(content, {
    //       jsc: {
    //         parser: {
    //           syntax: "modern",
    //         },
    //         transform: {
    //           asyncAwait: true,
    //         },
    //       },
    //     }).code;
    //     return { code: output };
    //   },
    // },
    // {
    //   name: "babel",
    //   test: /\.(js|ts|tsx|jsx)$/,
    //   transform(content, ctx) {
    //     const babel = require("@babel/core");
    //     const output = babel.transformSync(content, {
    //       jsc: {
    //         parser: {
    //           syntax: "modern",
    //         },
    //         transform: {
    //           asyncAwait: true,
    //         },
    //       },
    //       plugins: [[path.resolve(__dirname, "./src/plugin/info.js")]],
    //     }).code;
    //     return { code: output };
    //   },
    // },
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

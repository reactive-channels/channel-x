import path from "path";
import veauryVitePlugins from "veaury/vite/index.js";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";

const customPlugin2 = ({ root, write }) => {
  return {
    name: "custom-plugin",
    test: /\.(tsx|jsx)$/,
    transform(content, ctx) {
      if (!ctx.startsWith(root)) {
        return { code: content };
      }

      // Match Channel.use('...').consumer() in the file
      const regex = /(Channel\.use\("([^"]+)"\))\.consumer\(\)/g;

      const newContent = content.replace(
        regex,
        (match, useExpression, channelName) => {
          // Get the file name without the extension
          const fileName = ctx
            .replace(root, "")
            .replace(/\/(\w+)\.[tj]sx?$/, "$1");

          // Replace Channel.use('...').consumer() with Channel.use('...').consumer('fileName', 'channelName')
          const instance = {
            type: {
              __file: fileName,
            },
          };
          const currentInstance = JSON.stringify(instance);
          return `${useExpression}.consumer({ type: { __file: "${fileName}" } })`;
        }
      );

      return { code: newContent };
    },
  };
};

const customPlugin = ({ root, write }) => {
  return {
    name: "custom-plugin",
    test: /\.(tsx|jsx)$/,
    transform(content, ctx) {
      // console.log("ctx", ctx);
      // Process the content of the file here and extract the relevant information you want
      // Only process files in the root directory
      // console.log("ctx", ctx);
      // console.log("root", root);
      if (!ctx.startsWith(root)) {
        return { code: content };
      }
      const store = {};
      const lines = content.split("\n");
      // if (
      //   ctx !==
      //   "/Users/studio/Documents/Projects/channel-x/packages/react.channel/src/components/A.tsx"
      // )
      //  return { code: content };
      lines.forEach((line) => {
        if (line.includes("Channel.use")) {
          const regex = /use\("([^"]+)"\)/;
          const match = line.match(regex);
          const channelName = match ? match[1] : null;
          if (typeof channelName === "string" && channelName) {
            console.log("channelName", channelName);

            const regex = /\/(\w+)\.[tj]sx?$/;
            const match = ctx.match(regex);
            const fileName = match ? match[1] : null;

            //const fileName = ctx.fileName;
            //const filePath = ctx.root;
            console.log("fileName", fileName);
            //  console.log("filePath", filePath);
            // Store the information in the store object
            //store[channelName] = { fileName, filePath };
            // console.log("store", store);
            //  globalThis.store = globalThis.store || {};
            //globalThis.store = store;
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
    customPlugin2({ root: __dirname, write: true }),
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

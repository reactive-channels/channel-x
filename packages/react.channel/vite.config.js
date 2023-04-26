import generate from "@babel/generator";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import path from "path";
import veauryVitePlugins from "veaury/vite/index.js";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
const customPlugin2 = ({ root, write }) => {
  return {
    name: "custom-plugin",
    test: /\.(jsx|tsx)$/,
    transform(content, ctx) {
      if (!/\.(jsx|tsx)$/.test(ctx)) {
        return { code: content };
      }

      if (!ctx.startsWith(root)) {
        return { code: content };
      }

      const ext = ctx?.split(".").pop();
      if (ext === "css") {
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

          return `${useExpression}.consumer({ type: { __file: "${fileName}" } })`;
        }
      );

      const ast = parse(newContent, {
        sourceType: "module",
        plugins: ["jsx", "typescript"],
      });
      let componentName = "d";

      const traverseFunction = traverse;
      let hasReturnStatement = false;
      if (!ctx.includes("B.tsx")) return { code: content };
      let isFirstJSXElement = true;

      traverseFunction.default(ast, {
        JSXOpeningElement(path) {
          if (isFirstJSXElement) {
            console.log("d");
            const openingElement = path.node.openingElement;

            openingElement.attributes.push({
              type: "JSXAttribute",
              name: {
                type: "JSXIdentifier",
                name: "data-channel-x",
              },
              value: null,
            });

            isFirstJSXElement = false;
          }
        },
      });
      console.log("dsf");
      const generateFunction = generate;
      const { code } = generateFunction.default(ast, {});
      return { code };
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

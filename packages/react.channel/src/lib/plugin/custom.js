const fs = require("fs");
const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;

const custom = ({ root, write }) => {
  return {
    name: "custom-plugin",
    test: /\.(tsx|jsx)$/,
    transform(content, ctx) {
      if (!ctx.startsWith(root)) {
        return { code: content };
      }

      const ast = parse(content, {
        sourceType: "module",
        plugins: ["jsx", "typescript"],
      });

      let componentName = null;

      traverse(ast, {
        ImportDeclaration(path) {
          if (path.node.source.value.endsWith(".css")) {
            const name = path.node.specifiers[0].local.name;
            componentName = name;
          }
        },
        JSXOpeningElement(path) {
          if (!componentName) return;

          const { node } = path;
          if (node.name.name === componentName) {
            const filename = ctx.split("/").pop().split(".")[0];

            const existingAttr = node.attributes.find(
              (attr) => attr.name.name === "data-channel-x"
            );
            if (!existingAttr) {
              const dataChannelXAttr = {
                type: "JSXAttribute",
                name: {
                  type: "JSXIdentifier",
                  name: "data-channel-x",
                },
                value: {
                  type: "StringLiteral",
                  value: filename,
                },
              };
              node.attributes.push(dataChannelXAttr);
            }
          }
        },
      });

      const { code } = generate(ast, {});
      return { code };
    },
  };
};

module.exports = custom;

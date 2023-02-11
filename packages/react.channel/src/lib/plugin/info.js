console.log("sdfjhsdlfnlksdjflksdjflkjsdl");
const { File, types: t } = require("@babel/core");

module.exports = function ({ types: t }) {
  window.dddddd = "dddd";
  return {
    visitor: {
      CallExpression(path) {
        // console.log("d", path.node);
        const node = path.node;
        if (
          t.isIdentifier(node.callee) &&
          node.callee.name === "Channel" &&
          node.arguments.length > 0 &&
          t.isIdentifier(node.arguments[0], { name: "use" })
        ) {
          // Check if the second argument is a string literal
          const channelName = node.arguments[1];
          if (t.isStringLiteral(channelName)) {
            // Get the filename and path from the File metadata
            const fileName = path.hub.file.opts.filename;
            const filePath = path.hub.file.opts.cwd;

            // Store the information in a store object
            window.store = window.store || {};
            window.store[channelName.value] = { fileName, filePath };
            console.log("store", window.store);
          }
        }
      },
    },
  };
};

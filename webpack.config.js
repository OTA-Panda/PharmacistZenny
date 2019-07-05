const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./src/zenny.js",
  output: {
    path: path.join(__dirname),
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  devtool: 'source-map',
};

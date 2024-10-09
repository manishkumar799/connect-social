// eslint.config.js

const typescript = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const nodePlugin = require("eslint-plugin-node");

module.exports = [
  {
    ignores: ["dist", "node_modules"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "commonjs",  // Set to commonjs for Node.js environment
    },
    plugins: {
      "@typescript-eslint": typescript,
      node: nodePlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "node/no-unsupported-features/es-syntax": "off",
    },
  }
];

// eslint.config.js
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import nextPlugin from "eslint-plugin-next";

export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // Apply to JavaScript and TypeScript files
    ignores: ["**/node_modules/*", "**/.next/*", "**/out/*", "**/dist/*"], // Ignore common directories
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",  // Use the latest ECMAScript features
        sourceType: "module",  // Use ES modules
        project: ["./tsconfig.json"], // ***IMPORTANT***: Path to your tsconfig.json
      },
      globals: {  //common globals for browsers.
        ...js.configs.recommended.globals,
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
        next: nextPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs["recommended-type-checked"].rules,
      ...tsPlugin.configs["stylistic-type-checked"].rules,
        ...nextPlugin.configs.recommended.rules,
        ...nextPlugin.configs['core-web-vitals'].rules,

      // Add any custom rules or overrides here
      "@typescript-eslint/no-explicit-any": "warn", // Example: Warn on 'any' type
      "@typescript-eslint/explicit-function-return-type": "off", // Example: Don't require explicit return types
    },
  },
  js.configs.recommended, //ESLint recommended rules
];
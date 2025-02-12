"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _js = _interopRequireDefault(require("@eslint/js"));

var _parser = _interopRequireDefault(require("@typescript-eslint/parser"));

var _eslintPlugin = _interopRequireDefault(require("@typescript-eslint/eslint-plugin"));

var _eslintPluginNext = _interopRequireDefault(require("eslint-plugin-next"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = [{
  files: ["**/*.{js,jsx,ts,tsx}"],
  // Apply to JavaScript and TypeScript files
  ignores: ["**/node_modules/*", "**/.next/*", "**/out/*", "**/dist/*"],
  // Ignore common directories
  languageOptions: {
    parser: _parser["default"],
    parserOptions: {
      ecmaVersion: "latest",
      // Use the latest ECMAScript features
      sourceType: "module",
      // Use ES modules
      project: ["./tsconfig.json"] // ***IMPORTANT***: Path to your tsconfig.json

    },
    globals: _objectSpread({}, _js["default"].configs.recommended.globals)
  },
  plugins: {
    "@typescript-eslint": _eslintPlugin["default"],
    next: _eslintPluginNext["default"]
  },
  rules: _objectSpread({}, _js["default"].configs.recommended.rules, {}, _eslintPlugin["default"].configs["recommended-type-checked"].rules, {}, _eslintPlugin["default"].configs["stylistic-type-checked"].rules, {}, _eslintPluginNext["default"].configs.recommended.rules, {}, _eslintPluginNext["default"].configs['core-web-vitals'].rules, {
    // Add any custom rules or overrides here
    "@typescript-eslint/no-explicit-any": "warn",
    // Example: Warn on 'any' type
    "@typescript-eslint/explicit-function-return-type": "off" // Example: Don't require explicit return types

  })
}, _js["default"].configs.recommended //ESLint recommended rules
];
exports["default"] = _default;
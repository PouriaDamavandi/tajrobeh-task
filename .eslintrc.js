module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    tsconfigRootDir: __dirname,
    project: [
      "./tsconfig.base.json",
      "./apps/*/tsconfig.json",
      "./packages/*/tsconfig.json",
    ],
  },
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
  },
  ignorePatterns: ["dist", "node_modules"],

  // Use overrides for app-specific configurations
  overrides: [
    {
      files: ["apps/container-app/**/*.{ts,tsx}"],
      parserOptions: {
        project: ["./apps/container-app/tsconfig.json"],
      },
    },
    {
      files: ["apps/products-app/**/*.{ts,tsx}"],
      parserOptions: {
        project: ["./apps/products-app/tsconfig.json"],
      },
    },
    {
      files: ["apps/cart-app/**/*.{ts,tsx}"],
      parserOptions: {
        project: ["./apps/cart-app/tsconfig.json"],
      },
    },
  ],
};

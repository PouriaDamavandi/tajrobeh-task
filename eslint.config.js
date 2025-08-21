export default [
  {
    files: ["apps/container-app/**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: ["./apps/container-app/tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ["apps/products-app/**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: ["./apps/products-app/tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ["apps/cart-app/**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: ["./apps/cart-app/tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
  },
];

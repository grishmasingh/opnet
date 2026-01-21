// @ts-check

import eslint from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigDirName: import.meta.dirname,
      },
    },
    plugins: {
      // @ts-ignore
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    // @ts-ignore
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-undef": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-empty": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/only-throw-error": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/unbound-method": "warn",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-extraneous-class": "off",
      "no-async-promise-executor": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-unnecessary-type-parameters": "off",
      "@typescript-eslint/no-duplicate-enum-values": "off",
      "prefer-spread": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
  {
    files: ["**/*.js"],
    ...tseslint.configs.disableTypeChecked,
  }
);
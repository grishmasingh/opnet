React (Vite) Project
To build React applications for OP_NET, you must use Vite instead of Create React App (CRA), as CRA is outdated and doesn't provide the optimizations and compatibility required for modern development. This guide outlines the required configurations for your development environment.

Why use Vite?
Vite offers a modern, fast, and optimized bundler that integrates seamlessly with React. It ensures compatibility with OP_NET and significantly improves the development experience.

Creating a New React Project
Use npm to install Vite and create a new React project.

The following command shows how to create a Vite React project:
Create a new Vite React project
bash

Copy
npm create vite@latest my-app -- --template react-ts
Configuration
The following configurations are required for your React project to work properly with OP_NET. Without these settings, your project may fail to build or run correctly.

1. Vite Configuration
Use the npm package manager to install the required plugins.

The following command shows how to install the plugins:
Install required plugins
bash

Copy
npm install vite@5 vite-plugin-node-polyfills vite-plugin-eslint2
Warning
IMPORTANT Ensure you use vite@5 for compatibility with vite-plugin-eslint2.

Vite Configuration File
Your project must include a vite.config.ts file containing the required configuration.

The following shows the required vite.config.ts configuration:
vite.config.ts file
typescript

Copy
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint2";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [react(), nodePolyfills(), eslint()],
  resolve: {
    alias: {
      global: "global",
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
Best Practices
Using ESLint version 9 is mandatory. Any other version may cause linting errors.
TypeScript is required for OP_NET React development. Using JavaScript may lead to runtime issues and is strongly discouraged.
Ensure you configure your project with Vite, as Create React App is not supported.
Always use version 5 of Vite for compatibility with vite-plugin-eslint2.
2. TypeScript Configuration
Using TypeScript is mandatory for OP_NET development. JavaScript may cause runtime issues and is not supported for production-level development.

Typescript Configuration File
Your project must include a tsconfig.json file containing the required configuration.

The following shows the required tsconfig.json configuration:
tsconfig.json file
json

Copy
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ]
}
App-specific Configuration File
Your project must include an App-specific tsconfig.app.json file.

The following shows the required tsconfig.app.json configuration:
tsconfig.app.json file
json

Copy
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
Node-specific Configuration File
Your project must include an Node-specific tsconfig.node.json file.

The following shows the required Node-specific tsconfig.node.json configuration:
tsconfig.app.json file
json

Copy
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
3. ESLint Configuration
You must use ESLint version 9, no higher or lower versions are supported. Your project must include an eslint.config.js file.

ESLint Configuration File
The following shows the required ESLint eslint.config.js configuration:
eslint.config.js file
javascript

Copy
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
On this page
Creating a New React Project
Configuration

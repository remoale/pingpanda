import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], languageOptions: { globals: globals.browser } },
  { rules: {
    "react/no-unescaped-entities": "off",
    "@next/next/no-img-element": "off",
  }},
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);
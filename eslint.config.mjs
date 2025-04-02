import { defineConfig, globalIgnores } from "eslint/config";
import tsParser from "@typescript-eslint/parser";
import graphqlEslint from "@graphql-eslint/eslint-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores([
    "**/node_modules/",
    "**/.cache/",
    "**/public",
    "src/gatsby-types.d.ts",
    "**/.DS_Store",
  ]),
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: compat.extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended"
    ),

    languageOptions: {
      globals: {},
      parser: tsParser,
    },

    // processor: "@graphql-eslint/graphql",
  },
  {
    files: ["**/*.graphql"],

    plugins: {
      "@graphql-eslint": graphqlEslint,
    },

    languageOptions: {
      parser: graphqlEslint.parser,
    },

    rules: {
      "@graphql-eslint/no-anonymous-operations": "error",

      "@graphql-eslint/naming-convention": [
        "error",
        {
          OperationDefinition: {
            style: "PascalCase",
            forbiddenPrefixes: ["Query", "Mutation", "Subscription", "Get"],
            forbiddenSuffixes: ["Query", "Mutation", "Subscription"],
          },
        },
      ],
    },
  },
]);

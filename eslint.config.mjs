import globals from "globals";
import parser from "vue-eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "**/dist",
        "**/node_modules",
        "**/build",
        "**/coverage",
        "**/docs",
        "**/test",
    ],
}, ...compat.extends("plugin:vue/vue3-recommended"), {
    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.browser,
        },

        parser: parser,
        ecmaVersion: 5,
        sourceType: "commonjs",

        parserOptions: {
            parser: {
                ts: "@typescript-eslint/parser",
            },
            sourceType: "module",
            ecmaVersion: "latest",
        },
    },

    rules: {
        "no-trailing-spaces": ["warn"],
        "prefer-promise-reject-errors": "off",
        "vue/no-v-html": "off",
        "no-debugger": "off",

        "vue/multi-word-component-names": ["error", {
            ignores: ["error", "Error"],
        }],
    },
}, {
    files: ["components/**/**/*.vue"],

    rules: {
        "vue/multi-word-component-names": "off",
    },
}];
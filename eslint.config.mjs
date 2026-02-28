import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";

export default defineConfig([
    {
        files: ["**/*.js"],
        languageOptions: {
            globals: {
                ...globals.node,      // Node.js globals like require, module, process, console
            },
            sourceType: "commonjs",   // since you use require/module.exports
        },
        plugins: {
            js,
        },
        extends: ["js/recommended"],
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "warn",
            "semi": ["warn", "always"],
            quotes: ["warn", "double", { avoidEscape: true }],
        },
    },
]);

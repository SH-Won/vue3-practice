module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        // 'plugin:prettier/recommended',
        // 'prettier',
    ],
    plugins: ["prettier"],
    parserOptions: {
        parser: "@babel/eslint-parser",
    },

    rules: {
        "vue/no-multiple-template-root": "off",
        "no-unused-vars": ["error", { args: "none" }],
        "prettier/prettier": [
            "error",
            {
                // singleQuote: true,
                // semi: true,
                useTabs: false,
                tabWidth: 4,
                trailingComma: "all",
                printWidth: 80,
                bracketSpacing: true,
                arrowParens: "avoid",
                endOfLine: "auto",
            },
        ],
        // semi: ["error", "true"],
        // quotes: ['error', 'single'],

        "vue/html-self-closing": [
            "error",
            {
                html: {
                    void: "always",
                    normal: "never",
                    component: "always",
                },
                svg: "always",
                math: "always",
            },
        ],
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    },
};

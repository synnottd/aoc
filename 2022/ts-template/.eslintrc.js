module.exports = {
    extends: [
        'airbnb-base',
        'airbnb-typescript/base',
    ],
    rules: {
        '@typescript-eslint/indent': ['error', 4],
    },
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
};

module.exports = {
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  indent: ['error', 4],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};

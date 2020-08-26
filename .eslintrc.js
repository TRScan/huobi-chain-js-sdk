// eslint-disable-next-line no-undef
module.exports = {
  parserOptions: {
    ecmaVersion: 2017,
  },
  env: {
    jest: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
};

module.exports = {
  env: {
    node: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 6
  },
  rules: {
    indent: [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'no-console': 0,
    quotes: [
      'error',
      'single'
    ],
    'quote-props': [
      'error',
      'as-needed'
    ],
    semi: [
      'error',
      'always'
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ]
  }
};

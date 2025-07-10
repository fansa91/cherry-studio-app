// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    'expo',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  ignorePatterns: ['/dist/*'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unused-imports', 'simple-import-sort', 'prettier', 'react-compiler'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    'unused-imports/no-unused-imports': 'error',
    'no-async-promise-executor': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'no-case-declarations': 'off',
    'react/no-unescaped-entities': 'off',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: ['function'] },
      { blankLine: 'always', prev: '*', next: 'class' },
      { blankLine: 'always', prev: '*', next: 'multiline-block-like' },
      { blankLine: 'always', prev: 'multiline-block-like', next: '*' }
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/prop-types': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    'react-compiler/react-compiler': 'error'
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    },
    'import/ignore': ['lodash']
  },
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
    sourceType: 'module',
    ecmaVersion: 'latest'
  }
}

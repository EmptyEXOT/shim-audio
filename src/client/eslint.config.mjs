import js from '@eslint/js';
import react from 'eslint-plugin-react';
import globals from 'globals';

export default [
  js.configs.recommended,

  {
    plugins: {
      react,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
  },
];

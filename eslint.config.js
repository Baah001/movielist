// @ts-check
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const angularPlugin = require('@angular-eslint/eslint-plugin');
const angularTemplatePlugin = require('@angular-eslint/eslint-plugin-template');
const angularTemplateParser = require('@angular-eslint/template-parser');
const prettierPlugin = require('eslint-plugin-prettier');
const noRelativePathsPlugin = require('eslint-plugin-no-relative-import-paths');

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
  {
    // TypeScript files
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        createDefaultProgram: true,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@angular-eslint': angularPlugin,
      prettier: prettierPlugin,
      'no-relative-import-paths': noRelativePathsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...angularPlugin.configs.recommended.rules,
      'prettier/prettier': 'error', // Prettier integration
      '@angular-eslint/component-class-suffix': [
        'warn',
        {
          suffixes: ['Component', 'Overlay', 'Page'],
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/explicit-function-return-type': 'warn', // Require explicit return types for functions
      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        {
          allowSameFolder: true, // Allow relative imports in the same folder
        },
      ],
    },
  },
  {
    // HTML template files
    files: ['**/*.html'],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin,
    },
    rules: {
      ...angularTemplatePlugin.configs.recommended.rules,
    },
  },
];

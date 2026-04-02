import { defineConfig } from 'vite-plus';

export default defineConfig({
  lint: {
    options: { typeAware: true, typeCheck: true },
    ignorePatterns: ['**/dist/**', '**/node_modules/**', '**/generated/**'],
    categories: {
      correctness: 'warn',
    },
    rules: {
      'eslint/eqeqeq': 'error',
      'eslint/max-classes-per-file': ['error', 1],
      'eslint/max-lines': ['error', 400],
      'eslint/no-empty-function': 'warn',
      'eslint/no-restricted-imports': 'warn',
      'eslint/no-shadow': 'warn',
      'eslint/no-unused-expressions': 'off',
      'eslint/no-unused-private-class-members': 'warn',
      'eslint/no-unused-vars': 'warn',
      'eslint/no-useless-concat': 'error',
      'eslint/no-var': 'error',
      'eslint/prefer-const': 'warn',
      'eslint/prefer-destructuring': 'warn',
      'eslint/prefer-spread': 'error',
      'eslint/prefer-template': 'warn',
      // 'eslint/sort-imports': 'error',
      'import/no-absolute-path': 'error',
      'import/unambiguous': 'error',
      'jsdoc/require-param-type': 'warn',
      'jsdoc/require-param': 'warn',
      'promise/prefer-await-to-callbacks': 'warn',
      'promise/prefer-await-to-then': 'warn',
      'typescript/consistent-indexed-object-style': ['error', 'record'],
      'typescript/consistent-type-exports': 'error',
      'typescript/no-explicit-any': 'warn',
      'typescript/no-extraneous-class': 'off',
      'typescript/no-floating-promises': 'warn',
      'typescript/no-import-type-side-effects': 'error',
      'typescript/no-inferable-types': 'error',
      'typescript/no-misused-promises': 'warn',
      'typescript/no-unnecessary-condition': 'error',
      'typescript/no-unnecessary-parameter-property-assignment': 'error',
      'typescript/no-unnecessary-qualifier': 'error',
      'typescript/no-unnecessary-template-expression': 'error',
      'typescript/no-unsafe-argument': 'off',
      'typescript/no-unsafe-assignment': 'off',
      'typescript/no-unsafe-call': 'off',
      'typescript/no-unsafe-member-access': 'off',
      'typescript/no-unsafe-return': 'error',
      'typescript/prefer-as-const': 'warn',
      'typescript/prefer-for-of': 'warn',
      'typescript/prefer-function-type': 'error',
      'typescript/prefer-optional-chain': 'error',
      // 'typescript/prefer-readonly-parameter-types': 'warn',
      // 'typescript/prefer-readonly': 'warn',
      'typescript/promise-function-async': 'error',
      // 'typescript/require-await': 'error',
      'typescript/restrict-template-expressions': 'error',
      'typescript/return-await': 'error',
      'typescript/unbound-method': 'off',

      // Angular style guide
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

      // Angular best practices
      '@angular-eslint/no-empty-lifecycle-method': 'warn',
      '@angular-eslint/no-output-native': 'off',
      '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
      '@angular-eslint/prefer-output-readonly': 'warn',
      '@angular-eslint/prefer-signals': 'warn',
      '@angular-eslint/prefer-standalone': 'warn',
    },
    settings: {
      jsdoc: {
        ignorePrivate: false,
        ignoreInternal: false,
        ignoreReplacesDocs: true,
        overrideReplacesDocs: true,
        augmentsExtendsReplacesDocs: false,
        implementsReplacesDocs: false,
        exemptDestructuredRootsFromChecks: false,
        tagNamePreference: {},
      },
      vitest: {
        typecheck: false,
      },
    },
    env: {
      builtin: true,
    },
  },
  fmt: {
    ignorePatterns: ['**/dist/**', '**/node_modules/**', '**/generated/**'],
    printinline-size: 80,
    arrowParens: 'avoid',
    bracketSameLine: true,
    bracketSpacing: true,
    quoteProps: 'as-needed',
    semi: true,
    singleQuote: true,
    singleAttributePerLine: true,
    trailingComma: 'all',
    useTabs: false,
    tabinline-size: 2,
    embeddedLanguageFormatting: 'auto',
    experimentalSortImports: {
      groups: [
        ['side_effect', 'side_effect_style'],
        ['builtin', 'external', 'subpath'],
        'internal',
        ['parent', 'sibling', 'index'],
        'unknown',
      ],
    },
    overrides: [
      {
        files: ['*.html'],
        options: {
          parser: 'angular',
        },
      },
      {
        files: ['index.html'],
        options: {
          parser: 'html',
        },
      },
      {
        files: ['*.ts'],
        options: {
          objectWrap: 'preserve',
        },
      },
      {
        files: ['*.css'],
        options: {
          singleQuote: false,
        },
      },
      {
        files: ['*.json', '*.jsonc'],
        options: {
          trailingComma: 'none',
          sortPackageJson: false,
        },
      },
    ],
  },
});

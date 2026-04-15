export default {
  printWidth: 100,
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  quoteProps: 'as-needed',
  semi: true,
  singleAttributePerLine: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'ignore',
  proseWrap: 'preserve',
  overrides: [
    {
      files: '*.css',
      options: {
        singleQuote: false,
      },
    },
    {
      files: '*.html',
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
};

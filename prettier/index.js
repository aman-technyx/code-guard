/**
 * @qvaroo/configs - Prettier Configuration
 * Prioritizes readability over cleverness.
 */

/** @type {import('prettier').Config} */
module.exports = {
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    trailingComma: 'all',
    singleQuote: true,
    jsxSingleQuote: false,
    quoteProps: 'as-needed',
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: 'always',
    proseWrap: 'preserve',
    htmlWhitespaceSensitivity: 'css',
    endOfLine: 'lf',
    embeddedLanguageFormatting: 'auto',
    singleAttributePerLine: false,

    overrides: [
        {
            files: ['*.json', '*.jsonc'],
            options: { tabWidth: 2, trailingComma: 'none' },
        },
        {
            files: ['*.md', '*.mdx'],
            options: { printWidth: 80, proseWrap: 'always' },
        },
        {
            files: ['*.yml', '*.yaml'],
            options: { tabWidth: 2, singleQuote: false },
        },
        {
            files: ['*.html'],
            options: { printWidth: 120, htmlWhitespaceSensitivity: 'strict' },
        },
        {
            files: ['*.css', '*.scss', '*.less'],
            options: { singleQuote: false },
        },
    ],
};

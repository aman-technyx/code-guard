/**
 * @qvaroo/configs - Node.js ESLint Configuration
 * 
 * Extended configuration for Node.js/Express/NestJS backend projects.
 * Includes all base rules plus Node-specific best practices.
 */

const baseConfig = require('./index');

/** @type {import('eslint').Linter.Config} */
module.exports = {
    ...baseConfig,

    env: {
        node: true,
        es2022: true,
    },

    plugins: [
        ...baseConfig.plugins,
        'n', // eslint-plugin-n (Node.js)
        'security',
    ],

    extends: [
        ...baseConfig.extends.filter(ext => ext !== 'prettier'),
        'plugin:n/recommended',
        'plugin:security/recommended',
        'prettier',
    ],

    rules: {
        ...baseConfig.rules,

        // ═══════════════════════════════════════════════════════════════════════
        // NODE.JS SPECIFIC RULES
        // ═══════════════════════════════════════════════════════════════════════

        // Allow console in Node.js (for logging)
        'no-console': 'off',

        // Node.js best practices
        'n/no-missing-import': 'error',
        'n/no-missing-require': 'error',
        'n/no-unpublished-import': 'off', // Dev dependencies in configs
        'n/no-unpublished-require': 'off',
        'n/no-unsupported-features/es-syntax': [
            'error',
            { ignores: ['modules'] },
        ],
        'n/no-extraneous-import': 'error',
        'n/no-deprecated-api': 'error',
        'n/prefer-global/buffer': ['error', 'always'],
        'n/prefer-global/console': ['error', 'always'],
        'n/prefer-global/process': ['error', 'always'],
        'n/prefer-promises/dns': 'error',
        'n/prefer-promises/fs': 'error',

        // ═══════════════════════════════════════════════════════════════════════
        // SECURITY RULES - Prevent common vulnerabilities
        // ═══════════════════════════════════════════════════════════════════════

        'security/detect-buffer-noassert': 'error',
        'security/detect-child-process': 'warn',
        'security/detect-disable-mustache-escape': 'error',
        'security/detect-eval-with-expression': 'error',
        'security/detect-new-buffer': 'error',
        'security/detect-no-csrf-before-method-override': 'error',
        'security/detect-non-literal-fs-filename': 'warn',
        'security/detect-non-literal-regexp': 'warn',
        'security/detect-non-literal-require': 'warn',
        'security/detect-object-injection': 'warn',
        'security/detect-possible-timing-attacks': 'warn',
        'security/detect-pseudoRandomBytes': 'error',
        'security/detect-unsafe-regex': 'error',

        // ═══════════════════════════════════════════════════════════════════════
        // ASYNC/AWAIT - Strict handling for backend
        // ═══════════════════════════════════════════════════════════════════════

        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/promise-function-async': 'error',
        'require-atomic-updates': 'error',

        // ═══════════════════════════════════════════════════════════════════════
        // ERROR HANDLING - Backend specific
        // ═══════════════════════════════════════════════════════════════════════

        'no-throw-literal': 'error',
        'prefer-promise-reject-errors': 'error',

        // ═══════════════════════════════════════════════════════════════════════
        // IMPORT/EXPORT - CommonJS & ESM support
        // ═══════════════════════════════════════════════════════════════════════

        'unicorn/prefer-module': 'off', // Allow CommonJS in Node
        '@typescript-eslint/no-require-imports': 'off', // Allow require()
    },

    overrides: [
        ...baseConfig.overrides,
        // Controller files - allow larger methods for route handlers
        {
            files: ['**/*.controller.ts', '**/controllers/**/*.ts'],
            rules: {
                'max-lines-per-function': ['error', { max: 60 }],
            },
        },
        // Migration files
        {
            files: ['**/migrations/**/*.ts'],
            rules: {
                '@typescript-eslint/naming-convention': 'off',
                'max-lines-per-function': 'off',
            },
        },
        // Seed files
        {
            files: ['**/seeds/**/*.ts', '**/seeders/**/*.ts'],
            rules: {
                'sonarjs/no-duplicate-string': 'off',
                'no-magic-numbers': 'off',
            },
        },
    ],
};

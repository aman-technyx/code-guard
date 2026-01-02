/**
 * @qvaroo/configs - ESLint Configuration
 * 
 * Strict Qvaroo-wide ESLint rules for TypeScript projects.
 * All violations will fail CI/CD pipelines.
 * 
 * @author Qvaroo DevOps Team
 * @version 1.0.0
 */

const namingConventionRules = require('./rules/naming-conventions');
const codeQualityRules = require('./rules/code-quality');
const spellcheckRules = require('./rules/spellcheck');

/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,

    parser: '@typescript-eslint/parser',

    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
    },

    plugins: [
        '@typescript-eslint',
        'spellcheck',
        'boundaries',
        'import',
        'promise',
        'unicorn',
        'sonarjs',
    ],

    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/strict',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:promise/recommended',
        'plugin:sonarjs/recommended',
        'prettier', // Must be last to override formatting rules
    ],

    settings: {
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: './tsconfig.json',
            },
        },
        'boundaries/elements': [
            { type: 'api', pattern: 'src/api/*' },
            { type: 'components', pattern: 'src/components/*' },
            { type: 'services', pattern: 'src/services/*' },
            { type: 'events', pattern: 'src/events/*' },
            { type: 'animations', pattern: 'src/animations/*' },
            { type: 'styles', pattern: 'src/styles/*' },
            { type: 'utils', pattern: 'src/utils/*' },
            { type: 'types', pattern: 'src/types/*' },
            { type: 'constants', pattern: 'src/constants/*' },
            { type: 'hooks', pattern: 'src/hooks/*' },
            { type: 'views', pattern: 'src/views/*' },
        ],
    },

    rules: {
        // ═══════════════════════════════════════════════════════════════════════
        // NAMING CONVENTIONS - Strict enforcement
        // ═══════════════════════════════════════════════════════════════════════
        ...namingConventionRules,

        // ═══════════════════════════════════════════════════════════════════════
        // CODE QUALITY - Method/class length, nesting, magic values
        // ═══════════════════════════════════════════════════════════════════════
        ...codeQualityRules,



        // ═══════════════════════════════════════════════════════════════════════
        // SPELLCHECK - Variable name clarity
        // ═══════════════════════════════════════════════════════════════════════
        ...spellcheckRules,

        // ═══════════════════════════════════════════════════════════════════════
        // ERROR HANDLING - No empty catches, must log & rethrow
        // ═══════════════════════════════════════════════════════════════════════
        'no-empty': ['error', { allowEmptyCatch: false }],
        '@typescript-eslint/no-empty-function': 'error',
        'no-useless-catch': 'error',

        // ═══════════════════════════════════════════════════════════════════════
        // PROMISE/ASYNC HANDLING
        // ═══════════════════════════════════════════════════════════════════════
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/promise-function-async': 'error',
        'promise/always-return': 'error',
        'promise/no-return-wrap': 'error',
        'promise/param-names': 'error',
        'promise/catch-or-return': 'error',
        'promise/no-nesting': 'warn',

        // ═══════════════════════════════════════════════════════════════════════
        // IMPORT ORGANIZATION
        // ═══════════════════════════════════════════════════════════════════════
        'import/order': [
            'error',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                    'type',
                ],
                'newlines-between': 'always',
                alphabetize: { order: 'asc', caseInsensitive: true },
            },
        ],
        'import/no-duplicates': 'error',
        'import/no-unresolved': 'error',
        'import/no-cycle': 'error',

        // ═══════════════════════════════════════════════════════════════════════
        // GENERAL BEST PRACTICES
        // ═══════════════════════════════════════════════════════════════════════
        'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
        'no-debugger': 'error',
        'no-alert': 'error',
        'prefer-const': 'error',
        'no-var': 'error',
        'eqeqeq': ['error', 'always'],
        'curly': ['error', 'all'],
        'no-eval': 'error',
        'no-implied-eval': 'error',
        'no-new-func': 'error',
        'no-return-await': 'off', // Handled by @typescript-eslint/return-await
        '@typescript-eslint/return-await': ['error', 'in-try-catch'],
        '@typescript-eslint/explicit-function-return-type': [
            'error',
            {
                allowExpressions: true,
                allowTypedFunctionExpressions: true,
                allowHigherOrderFunctions: true,
            },
        ],
        '@typescript-eslint/explicit-member-accessibility': [
            'error',
            { accessibility: 'explicit' },
        ],
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],

        // ═══════════════════════════════════════════════════════════════════════
        // UNICORN - Modern JavaScript practices
        // ═══════════════════════════════════════════════════════════════════════
        'unicorn/prefer-module': 'error',
        'unicorn/prefer-node-protocol': 'error',
        'unicorn/prefer-top-level-await': 'error',
        'unicorn/no-null': 'off', // Allow null for React patterns
        'unicorn/prevent-abbreviations': [
            'error',
            {
                replacements: {
                    props: false,
                    params: false,
                    args: false,
                    ref: false,
                    err: false,
                    ctx: false,
                    req: false,
                    res: false,
                },
            },
        ],
    },

    overrides: [
        // Test files - relaxed rules
        {
            files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
            rules: {
                '@typescript-eslint/no-explicit-any': 'off',
                'sonarjs/no-duplicate-string': 'off',
                'max-lines-per-function': 'off',
            },
        },
        // Configuration files
        {
            files: ['*.config.js', '*.config.ts', '.eslintrc.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
                'unicorn/prefer-module': 'off',
            },
        },
    ],

    ignorePatterns: [
        'node_modules/',
        'dist/',
        'build/',
        'coverage/',
        '.next/',
        '*.min.js',
        '*.generated.ts',
    ],
};

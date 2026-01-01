/**
 * @qvaroo/configs - React ESLint Configuration
 * 
 * Extended configuration for React/Next.js projects.
 * Includes all base rules plus React-specific best practices.
 */

const baseConfig = require('./index');

/** @type {import('eslint').Linter.Config} */
module.exports = {
    ...baseConfig,

    parserOptions: {
        ...baseConfig.parserOptions,
        ecmaFeatures: {
            jsx: true,
        },
    },

    plugins: [
        ...baseConfig.plugins,
        'react',
        'react-hooks',
        'jsx-a11y',
    ],

    extends: [
        ...baseConfig.extends.filter(ext => ext !== 'prettier'),
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/strict',
        'prettier',
    ],

    settings: {
        ...baseConfig.settings,
        react: {
            version: 'detect',
        },
    },

    rules: {
        ...baseConfig.rules,

        // ═══════════════════════════════════════════════════════════════════════
        // REACT SPECIFIC RULES
        // ═══════════════════════════════════════════════════════════════════════

        // Component naming - PascalCase enforced
        'react/jsx-pascal-case': ['error', { allowAllCaps: false }],

        // Hooks rules - strict enforcement
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',

        // JSX best practices
        'react/jsx-no-useless-fragment': 'error',
        'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
        'react/jsx-boolean-value': ['error', 'never'],
        'react/self-closing-comp': 'error',
        'react/no-array-index-key': 'error',
        'react/no-danger': 'error',
        'react/no-deprecated': 'error',
        'react/no-direct-mutation-state': 'error',
        'react/no-find-dom-node': 'error',
        'react/no-is-mounted': 'error',
        'react/no-string-refs': 'error',
        'react/no-unescaped-entities': 'error',
        'react/no-unknown-property': 'error',

        // Props and state
        'react/prop-types': 'off', // Using TypeScript
        'react/require-default-props': 'off', // Using TypeScript
        'react/jsx-props-no-spreading': [
            'error',
            {
                html: 'enforce',
                custom: 'ignore',
                explicitSpread: 'ignore',
            },
        ],

        // Performance
        'react/jsx-no-bind': [
            'error',
            {
                ignoreDOMComponents: false,
                ignoreRefs: true,
                allowArrowFunctions: true,
                allowFunctions: false,
                allowBind: false,
            },
        ],

        // Accessibility
        'jsx-a11y/alt-text': 'error',
        'jsx-a11y/anchor-has-content': 'error',
        'jsx-a11y/anchor-is-valid': 'error',
        'jsx-a11y/aria-props': 'error',
        'jsx-a11y/aria-role': 'error',
        'jsx-a11y/aria-unsupported-elements': 'error',
        'jsx-a11y/click-events-have-key-events': 'error',
        'jsx-a11y/heading-has-content': 'error',
        'jsx-a11y/html-has-lang': 'error',
        'jsx-a11y/iframe-has-title': 'error',
        'jsx-a11y/img-redundant-alt': 'error',
        'jsx-a11y/interactive-supports-focus': 'error',
        'jsx-a11y/label-has-associated-control': 'error',
        'jsx-a11y/lang': 'error',
        'jsx-a11y/media-has-caption': 'error',
        'jsx-a11y/mouse-events-have-key-events': 'error',
        'jsx-a11y/no-access-key': 'error',
        'jsx-a11y/no-autofocus': 'error',
        'jsx-a11y/no-distracting-elements': 'error',
        'jsx-a11y/no-interactive-element-to-noninteractive-role': 'error',
        'jsx-a11y/no-noninteractive-element-interactions': 'error',
        'jsx-a11y/no-noninteractive-element-to-interactive-role': 'error',
        'jsx-a11y/no-redundant-roles': 'error',
        'jsx-a11y/no-static-element-interactions': 'error',
        'jsx-a11y/role-has-required-aria-props': 'error',
        'jsx-a11y/role-supports-aria-props': 'error',
        'jsx-a11y/scope': 'error',
        'jsx-a11y/tabindex-no-positive': 'error',

        // Allow relaxed naming for React components
        '@typescript-eslint/naming-convention': [
            'error',
            // Keep all base rules
            ...require('./rules/naming-conventions')['@typescript-eslint/naming-convention'].slice(1),

            // Add exception for React functional components
            {
                selector: 'variable',
                modifiers: ['const', 'exported'],
                format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
            },
        ],
    },

    overrides: [
        ...baseConfig.overrides,
        // Next.js pages/app router files
        {
            files: ['**/pages/**/*.tsx', '**/app/**/*.tsx'],
            rules: {
                'import/no-default-export': 'off',
            },
        },
        // Component files
        {
            files: ['**/*.tsx'],
            rules: {
                'max-lines-per-function': ['error', { max: 80 }], // Allow larger components
            },
        },
    ],
};

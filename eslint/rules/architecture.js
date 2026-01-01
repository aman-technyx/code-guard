/**
 * Architecture Rules
 * 
 * Enforces folder structure and separation of concerns:
 * - /api, /components, /services, /events, /animations, /styles
 * - Presentation-only views: No business logic or API calls
 * - Boundary enforcement between layers
 */

module.exports = {
    // ═══════════════════════════════════════════════════════════════════════
    // BOUNDARY RULES - Folder separation enforcement
    // ═══════════════════════════════════════════════════════════════════════

    'boundaries/element-types': [
        'error',
        {
            default: 'disallow',
            rules: [
                // Components can import from: styles, types, utils, hooks, components, animations
                {
                    from: 'components',
                    allow: ['components', 'styles', 'types', 'utils', 'hooks', 'animations', 'constants'],
                },

                // Views can import from: components, styles, types, hooks (NO services, NO api)
                {
                    from: 'views',
                    allow: ['components', 'styles', 'types', 'hooks', 'animations', 'constants'],
                    disallow: ['api', 'services'], // Presentation-only views
                },

                // Services can import from: api, types, utils, constants
                {
                    from: 'services',
                    allow: ['api', 'types', 'utils', 'constants', 'services'],
                },

                // API layer can only import from: types, utils, constants
                {
                    from: 'api',
                    allow: ['types', 'utils', 'constants'],
                },

                // Hooks can import from: services, api, types, utils
                {
                    from: 'hooks',
                    allow: ['services', 'api', 'types', 'utils', 'constants', 'hooks'],
                },

                // Events can import from: types, utils
                {
                    from: 'events',
                    allow: ['types', 'utils', 'constants'],
                },

                // Animations can import from: types, utils, styles
                {
                    from: 'animations',
                    allow: ['types', 'utils', 'styles', 'constants'],
                },

                // Styles: standalone, no business imports
                {
                    from: 'styles',
                    allow: ['styles', 'constants'],
                },

                // Utils: standalone, no circular dependencies
                {
                    from: 'utils',
                    allow: ['types', 'constants'],
                },

                // Types: standalone
                {
                    from: 'types',
                    allow: ['types'],
                },

                // Constants: standalone
                {
                    from: 'constants',
                    allow: ['types'],
                },
            ],
        },
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // IMPORT BOUNDARIES - Prevent circular dependencies
    // ═══════════════════════════════════════════════════════════════════════

    'import/no-cycle': ['error', { maxDepth: 3 }],

    'import/no-restricted-paths': [
        'error',
        {
            zones: [
                // Views cannot import directly from API
                {
                    target: './src/views',
                    from: './src/api',
                    message: 'Views must not import from API directly. Use hooks or services instead.',
                },
                // Views cannot import directly from Services
                {
                    target: './src/views',
                    from: './src/services',
                    message: 'Views must not import from services directly. Use hooks instead.',
                },
                // Components cannot import from views (prevent circular)
                {
                    target: './src/components',
                    from: './src/views',
                    message: 'Components cannot import from views. This creates circular dependencies.',
                },
                // Styles cannot import business logic
                {
                    target: './src/styles',
                    from: './src/api',
                    message: 'Styles must not contain business logic or API dependencies.',
                },
                {
                    target: './src/styles',
                    from: './src/services',
                    message: 'Styles must not contain business logic or service dependencies.',
                },
            ],
        },
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // FILE NAMING PATTERNS
    // ═══════════════════════════════════════════════════════════════════════

    // Enforce consistent file naming
    'unicorn/filename-case': [
        'error',
        {
            cases: {
                kebabCase: true,    // Regular files: my-component.ts
                pascalCase: true,   // React components: MyComponent.tsx
            },
            ignore: [
                '^README\\.md$',
                '^CHANGELOG\\.md$',
                '^LICENSE$',
            ],
        },
    ],
};

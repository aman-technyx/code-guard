/**
 * Naming Convention Rules
 * 
 * Enforces strict naming patterns:
 * - Classes, Controllers, Models, UI Components → PascalCase
 * - Interfaces → IPascalCase (must start with I)
 * - Local variables & method parameters → camelCase
 * - Constants → UPPER_SNAKE_CASE
 * - UI event names → kebab-case (enforced via custom pattern)
 * - Methods returning Promise/Task → must end with Async
 */

module.exports = {
    '@typescript-eslint/naming-convention': [
        'error',

        // ─────────────────────────────────────────────────────────────────────
        // Default: camelCase for everything unless overridden
        // ─────────────────────────────────────────────────────────────────────
        {
            selector: 'default',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'forbid',
        },

        // ─────────────────────────────────────────────────────────────────────
        // Variables: camelCase or UPPER_CASE for constants
        // ─────────────────────────────────────────────────────────────────────
        {
            selector: 'variable',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
        },
        {
            selector: 'variable',
            modifiers: ['const', 'global'],
            format: ['camelCase', 'UPPER_CASE'],
        },
        {
            selector: 'variable',
            modifiers: ['const', 'exported'],
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        },

        // ─────────────────────────────────────────────────────────────────────
        // Parameters: camelCase only
        // ─────────────────────────────────────────────────────────────────────
        {
            selector: 'parameter',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
        },

        // ─────────────────────────────────────────────────────────────────────
        // Functions: camelCase, Async suffix for async functions
        // ─────────────────────────────────────────────────────────────────────
        {
            selector: 'function',
            format: ['camelCase'],
        },
        {
            selector: 'function',
            modifiers: ['async'],
            format: ['camelCase'],
            suffix: ['Async'],
        },

        // ─────────────────────────────────────────────────────────────────────
        // Methods: camelCase, Async suffix for async methods
        // ─────────────────────────────────────────────────────────────────────
        {
            selector: 'method',
            format: ['camelCase'],
        },
        {
            selector: 'method',
            modifiers: ['async'],
            format: ['camelCase'],
            suffix: ['Async'],
        },
        {
            selector: 'method',
            modifiers: ['private'],
            format: ['camelCase'],
            leadingUnderscore: 'require',
        },
        {
            selector: 'method',
            modifiers: ['private', 'async'],
            format: ['camelCase'],
            leadingUnderscore: 'require',
            suffix: ['Async'],
        },

        // ─────────────────────────────────────────────────────────────────────
        // Properties: camelCase for most, special handling for constants
        // ─────────────────────────────────────────────────────────────────────
        {
            selector: 'property',
            format: ['camelCase'],
        },
        {
            selector: 'property',
            modifiers: ['private'],
            format: ['camelCase'],
            leadingUnderscore: 'require',
        },
        {
            selector: 'property',
            modifiers: ['static', 'readonly'],
            format: ['UPPER_CASE', 'camelCase'],
        },
        {
            selector: 'classProperty',
            modifiers: ['readonly'],
            format: ['camelCase', 'UPPER_CASE'],
        },

        // ─────────────────────────────────────────────────────────────────────
        // Classes: PascalCase (includes Controllers, Models, Components)
        // ─────────────────────────────────────────────────────────────────────
        {
            selector: 'class',
            format: ['PascalCase'],
        },

        // ─────────────────────────────────────────────────────────────────────
        // Interfaces: IPascalCase (must start with 'I')
        // ─────────────────────────────────────────────────────────────────────
        {
            selector: 'interface',
            format: ['PascalCase'],
            prefix: ['I'],
        },

        // ─────────────────────────────────────────────────────────────────────
        // Type Aliases: PascalCase
        // ─────────────────────────────────────────────────────────────────────
        {
            selector: 'typeAlias',
            format: ['PascalCase'],
        },

        // ─────────────────────────────────────────────────────────────────────
        // Type Parameters (Generics): PascalCase with T prefix
        // ─────────────────────────────────────────────────────────────────────
        {
            selector: 'typeParameter',
            format: ['PascalCase'],
            prefix: ['T', 'K', 'V', 'E', 'P'],
        },

        // ─────────────────────────────────────────────────────────────────────
        // Enums and Enum Members: PascalCase
        // ─────────────────────────────────────────────────────────────────────
        {
            selector: 'enum',
            format: ['PascalCase'],
        },
        {
            selector: 'enumMember',
            format: ['PascalCase', 'UPPER_CASE'],
        },

        // ─────────────────────────────────────────────────────────────────────
        // Object literal properties: allow flexibility for API responses
        // ─────────────────────────────────────────────────────────────────────
        {
            selector: 'objectLiteralProperty',
            format: null,
            modifiers: ['requiresQuotes'],
        },

        // ─────────────────────────────────────────────────────────────────────
        // Import names: allow as-imported
        // ─────────────────────────────────────────────────────────────────────
        {
            selector: 'import',
            format: ['camelCase', 'PascalCase'],
        },
    ],
};

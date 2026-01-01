/**
 * Code Quality Rules
 * 
 * Enforces strict quality limits:
 * - Method length: max 40 lines → error
 * - Class length: max 300 lines → error
 * - Max nested if statements: 2 → error
 * - No magic strings / hard-coded values → error
 * - No empty catch blocks → error
 * - Guard clauses enforcement
 */

module.exports = {
    // ═══════════════════════════════════════════════════════════════════════
    // METHOD & CLASS LENGTH LIMITS
    // ═══════════════════════════════════════════════════════════════════════

    // Maximum 40 lines per function/method
    'max-lines-per-function': [
        'error',
        {
            max: 40,
            skipBlankLines: true,
            skipComments: true,
            IIFEs: true,
        },
    ],

    // Maximum 300 lines per file (proxy for class length)
    'max-lines': [
        'error',
        {
            max: 300,
            skipBlankLines: true,
            skipComments: true,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // NESTING DEPTH - Maximum 2 nested if statements
    // ═══════════════════════════════════════════════════════════════════════

    'max-depth': ['error', { max: 2 }],

    // ═══════════════════════════════════════════════════════════════════════
    // COMPLEXITY LIMITS - Encourage simpler code
    // ═══════════════════════════════════════════════════════════════════════

    // Cyclomatic complexity limit
    complexity: ['error', { max: 10 }],

    // Maximum statements per function
    'max-statements': ['error', { max: 20 }],

    // Maximum parameters
    'max-params': ['error', { max: 4 }],

    // ═══════════════════════════════════════════════════════════════════════
    // MAGIC VALUES - No hard-coded strings/numbers
    // ═══════════════════════════════════════════════════════════════════════

    // No magic numbers (must use named constants)
    'no-magic-numbers': [
        'error',
        {
            ignore: [-1, 0, 1, 2, 100], // Common acceptable values
            ignoreArrayIndexes: true,
            ignoreDefaultValues: true,
            enforceConst: true,
            detectObjects: false,
        },
    ],

    // SonarJS: Enforce no duplicate strings (magic strings)
    'sonarjs/no-duplicate-string': [
        'error',
        {
            threshold: 3,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // GUARD CLAUSES - Early returns encouraged
    // ═══════════════════════════════════════════════════════════════════════

    // Prefer early returns (guard clauses)
    'no-else-return': [
        'error',
        {
            allowElseIf: false,
        },
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // COGNITIVE COMPLEXITY - Readability enforcement
    // ═══════════════════════════════════════════════════════════════════════

    'sonarjs/cognitive-complexity': ['error', 15],

    // ═══════════════════════════════════════════════════════════════════════
    // CODE DUPLICATION - DRY principle
    // ═══════════════════════════════════════════════════════════════════════

    'sonarjs/no-identical-functions': 'error',
    'sonarjs/no-all-duplicated-branches': 'error',
    'sonarjs/no-duplicated-branches': 'error',

    // ═══════════════════════════════════════════════════════════════════════
    // ADDITIONAL QUALITY RULES
    // ═══════════════════════════════════════════════════════════════════════

    // No nested ternaries
    'no-nested-ternary': 'error',

    // Require default case in switch
    'default-case': 'error',
    'default-case-last': 'error',

    // No fallthrough in switch (must be explicit)
    'no-fallthrough': ['error', { commentPattern: 'falls?\\s?through' }],

    // Enforce consistent return
    'consistent-return': 'error',

    // No unreachable code
    'no-unreachable': 'error',
    'no-unreachable-loop': 'error',

    // ═══════════════════════════════════════════════════════════════════════
    // ERROR HANDLING - Strict enforcement
    // ═══════════════════════════════════════════════════════════════════════

    // No empty blocks (including catch)
    'no-empty': ['error', { allowEmptyCatch: false }],

    // Prefer throwing Error objects
    '@typescript-eslint/only-throw-error': 'error',

    // Require await in async functions
    'require-await': 'off', // Handled by TypeScript
    '@typescript-eslint/require-await': 'error',
};

/**
 * @qvaroo/configs
 * Centralized Qvaroo coding standards for TypeScript projects.
 */

module.exports = {
    eslint: require('./eslint'),
    eslintReact: require('./eslint/react'),
    eslintNode: require('./eslint/node'),
    prettier: require('./prettier'),

    // Individual Rule Sets
    namingConventions: require('./eslint/rules/naming-conventions'),
    codeQuality: require('./eslint/rules/code-quality'),
    architecture: require('./eslint/rules/architecture'),
    spellcheck: require('./eslint/rules/spellcheck'),
};

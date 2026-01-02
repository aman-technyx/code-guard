# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-01

### Added

- **Dual ESM/CJS Support**
  - Seamless support for `import` and `require`
  - Granular rule exports for Flat Config (`eslint.config.mjs`) support
- **Core ESLint Configurations**
  - Base TypeScript configuration with strict rules
  - Cleaned up React/Node specific configurations to be more generic
- **Naming Convention Rules**
  - PascalCase for classes, controllers, models, components
  - IPascalCase for interfaces (required I prefix)
  - camelCase for variables and parameters
  - UPPER_SNAKE_CASE for constants
  - Async suffix requirement for async methods
- **Code Quality Rules**
  - Maximum 40 lines per method
  - Maximum 300 lines per file
  - Maximum 2 levels of nesting
  - No magic numbers/strings
  - No empty catch blocks
  - Guard clause enforcement

- **Spellcheck Integration**
  - Variable and function name spelling validation
  - Comprehensive skip list for tech terms
- **Prettier Configuration**
  - 100 character line width
  - Single quotes, semicolons, trailing commas
  - File-type specific overrides
- **TypeScript Configurations**
  - Strict mode with all recommended flags
  - React-specific configuration
  - Node.js-specific configuration
  - Path alias support for clean imports
- **Documentation**
  - Comprehensive README with examples
  - CI/CD integration guides
  - Naming convention reference tables

### Security

- eslint-plugin-security integration for Node.js configs
- Detects common vulnerability patterns

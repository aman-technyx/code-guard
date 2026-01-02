# @qvaroo/configs

> **Centralized Qvaroo coding standards for TypeScript frontend projects.**
>
> This library acts as the **single source of truth** for all coding, architecture, and tooling standards. All rule violations **fail CI/CD pipelines**, removing human discretion from standards enforcement.

[![npm version](https://img.shields.io/npm/v/@qvaroo/configs.svg)](https://www.npmjs.com/package/@qvaroo/configs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📦 Installation

```bash
npm install --save-dev @qvaroo/configs
```

### Peer Dependencies

Ensure these are installed in your project:

```bash
npm install --save-dev eslint prettier typescript
```

---

## 🚀 Quick Setup

### 1. ESLint Configuration (New Flat Config)
Create `eslint.config.mjs` in your project root:

```javascript
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// 1. Plugins (must be explicitly imported and registered in Flat Config)
const spellcheckPlugin = require('eslint-plugin-spellcheck');
const sonarjsPlugin = require('eslint-plugin-sonarjs');

// 2. Qvaroo Configs
const { 
    namingConventions, 
    codeQuality,
    spellcheck
} = require('@qvaroo/configs');

export default [
    {
        files: ['**/*.{ts,tsx}'],
        
        // 3. Register Plugins
        plugins: {
            'spellcheck': spellcheckPlugin,
            'sonarjs': sonarjsPlugin
        },

        // 4. Apply Rules
        rules: {
            ...namingConventions,
            ...codeQuality,
            ...spellcheck
        },
        
        // 5. TypeScript Parser Config (Required for type-aware rules)
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
];
```

** Legacy Config (.eslintrc.js):**
If you are still using the legacy config system:
```javascript
module.exports = {
  extends: ['./node_modules/@qvaroo/configs/eslint/index.js'],
  parserOptions: {
    project: './tsconfig.json',
  },
};
```

### 2. Prettier Configuration

Create `prettier.config.js`:

```javascript
module.exports = require('@qvaroo/configs/prettier');
```

### 3. TypeScript Configuration

Create `tsconfig.json`:

**For React projects:**
```json
{
  "extends": "@qvaroo/configs/typescript/react",
  "compilerOptions": {
    "baseUrl": "."
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**For Node.js projects:**
```json
{
  "extends": "@qvaroo/configs/typescript/node",
  "compilerOptions": {
    "baseUrl": "."
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## 📐 Enforced Standards

### Naming Conventions

| Element | Format | Example |
|---------|--------|---------|
| Classes, Controllers, Models | `PascalCase` | `UserController` |
| UI Components | `PascalCase` | `NavigationBar` |
| Interfaces | `IPascalCase` | `IUserService` |
| Local variables | `camelCase` | `userData` |
| Method parameters | `camelCase` | `userId` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_RETRY_COUNT` |
| Private methods | `_camelCase` | `_validateInput` |
| Async methods | `*Async` suffix | `fetchUserAsync` |

### Code Quality Limits

| Rule | Limit | Severity |
|------|-------|----------|
| Method length | 40 lines max | ❌ Error |
| File/Class length | 300 lines max | ❌ Error |
| Nested if statements | 2 levels max | ❌ Error |
| Cyclomatic complexity | 10 max | ❌ Error |
| Function parameters | 4 max | ❌ Error |

### Prohibited Patterns

- ❌ Magic strings/numbers (use constants)
- ❌ Empty catch blocks (must log & rethrow)
- ❌ Deeply nested code (use guard clauses)
- ❌ Floating promises (must await or handle)
- ❌ Any type usage (must be explicit)

---



## ⛔️ Local Enforcement (Pre-commit Hooks)

To ensure developers fix errors **before** they commit, set up [Husky](https://typicode.github.io/husky/).

1. **Install Husky & Lint-staged**:
   ```bash
   npm install --save-dev husky lint-staged
   npx husky init
   ```

2. **Configure Pre-commit Hook**:
   Update `.husky/pre-commit` to run lint-staged:
   ```bash
   npx lint-staged
   ```

3. **Update `package.json`**:
   Add the configuration to check only changed files:
   ```json
   {
     "lint-staged": {
       "src/**/*.{ts,tsx,js}": [
         "eslint --fix",
         "prettier --write"
       ]
     }
   }
   ```

   > Now, if a developer tries to commit code with errors, **git will reject the commit** until fixed.

---

## 🔧 CI/CD Integration

### GitHub Actions

```yaml
name: Lint & Type Check

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci
      - run: npm run lint
        # Fails on any lint error
      - run: npx tsc --noEmit
        # Fails on type errors
```

### Package.json Scripts

```json
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx --max-warnings 0",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,json,css}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,json,css}\"",
    "typecheck": "tsc --noEmit"
  }
}
```

---

## 📝 Examples

### ✅ Correct Naming

```typescript
// Constants - UPPER_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = 'https://api.example.com';

// Interface - IPascalCase
interface IUserProfile {
  id: string;
  displayName: string;
}

// Class - PascalCase
class UserService {
  // Private property - _camelCase
  private readonly _httpClient: IHttpClient;

  // Async method - ends with Async
  public async fetchUserAsync(userId: string): Promise<IUserProfile> {
    return await this._httpClient.getAsync(`/users/${userId}`);
  }

  // Private async method
  private async _validateTokenAsync(): Promise<boolean> {
    // ...
  }
}
```

### ❌ Incorrect (Will Fail)

```typescript
// ❌ Magic number
if (retryCount > 3) { }

// ❌ Interface without I prefix
interface UserProfile { }

// ❌ Async method without Async suffix
async function fetchUser() { }

// ❌ Empty catch block
try {
  await riskyOperation();
} catch (e) {
  // Empty - will error!
}

// ❌ Too much nesting
if (a) {
  if (b) {
    if (c) { // Error: max depth 2
    }
  }
}
```

### ✅ Guard Clause Pattern

```typescript
// ✅ Preferred: Early returns
function processUser(user: IUser | null): void {
  if (!user) {
    throw new Error('User is required');
  }

  if (!user.isActive) {
    return;
  }

  // Main logic here (flat, readable)
  performAction(user);
}

// ❌ Avoid: Deep nesting
function processUser(user: IUser | null): void {
  if (user) {
    if (user.isActive) {
      performAction(user);
    }
  } else {
    throw new Error('User is required');
  }
}
```

---

## 🔄 Extending Rules

Override specific rules in your project's `.eslintrc.js`:

```javascript
module.exports = {
  extends: ['./node_modules/@qvaroo/configs/eslint/react.js'],
  rules: {
    // Relax for specific project needs
    'max-lines-per-function': ['error', { max: 60 }],

    // Add project-specific rules
    'no-restricted-imports': ['error', {
      patterns: ['lodash/*'],
    }],
  },
};
```

---

## 📋 Spellcheck Configuration

Variable names are checked for spelling. Add project-specific terms:

```javascript
module.exports = {
  extends: ['./node_modules/@qvaroo/configs/eslint'],
  rules: {
    'spellcheck/spell-checker': ['warn', {
      skipWords: [
        // Add your domain terms
        'qvaroo',
        'oauth',
        'saml',
      ],
    }],
  },
};
```

---

## 🛡️ Enforcement Philosophy

> *"All rules are strictly enforced. Violations fail CI/CD pipelines. This library acts as the single source of truth, removing human discretion from coding standards enforcement."*

### Why Strict Enforcement?

1. **Consistency** - Every project follows identical standards
2. **Onboarding** - New developers learn patterns immediately
3. **Code Review** - Focus on logic, not style debates
4. **Maintainability** - Consistent code is easier to maintain
5. **Quality** - Prevents common bugs before they ship

---

## 📁 Package Contents

```
@qvaroo/configs/
├── eslint/
│   ├── index.js          # Base ESLint config
│   ├── react.js          # React/Next.js config
│   ├── node.js           # Node.js/Backend config
│   └── rules/
│       ├── naming-conventions.js
│       ├── code-quality.js
│       └── spellcheck.js
├── prettier/
│   └── index.js          # Prettier config
├── typescript/
│   ├── tsconfig.json         # Base TS config
│   ├── tsconfig.react.json   # React TS config
│   └── tsconfig.node.json    # Node.js TS config
├── index.js
├── index.d.ts
└── package.json
```

---

## 📄 License

MIT © Qvaroo DevOps Team

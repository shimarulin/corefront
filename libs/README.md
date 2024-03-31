# Project libs

## Anatomy of library

### Node.js library written in TypeScript

#### Root files

Root `tsconfig.json`:

```json
{
    "compilerOptions": {
        "declaration": true,
        "importHelpers": true,
        "module": "ESNext",
        "strict": true,
        "target": "ES2020",
        "esModuleInterop": true,
        "moduleResolution": "bundler",
        "resolveJsonModule": true,
    },
    "exclude": ["node_modules", "dist", "**/__tests__", "**/*.test.ts", "**/*.spec.ts"]
  }
```

Notes:
- `"moduleResolution": "bundler"` needs to resolve ES modules in the `tsc` compiler

#### Library

Lib `tsconfig.json`:

```json
{

  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"],
}
```

`package.json`

```json
{
  "name": "@corefront/vite-config-app",
  "type": "module",
  "types": "./dist/index.d.ts",
  "exports": {
    "import": "./dist/index.js"
  },
  "scripts": {
    "prepare": "pnpm run build",
    "build": "tsc -b"
  },
  "dependencies": {},
  "devDependencies": {
    "typescript": "^5.2.2",
  },
}
```

Notes:

- The `prepare` script is run before the `postinstall` script to build libs for use in applications.

#### Snippets

```ts
// Read 'package.json' from 'src/index.ts' in ES modules
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkg = import(resolve(__dirname, '../', 'package.json'), {with: {type: 'json'}})

console.log(pkg)
```

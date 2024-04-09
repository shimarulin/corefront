# @corefront/tsconfig-preset-es-module

> Corefront TypeScript preset for use in project tools

## Insall and usage

In the package directory, run:

```sh
pnpm add -D --workspace @corefront/tsconfig-preset-es-module
```

and add the following `tsconfig.json` to the package directory:

```json
{
  "extends": "@corefront/tsconfig-preset-es-module/default.json",
  "compilerOptions": {
    "baseUrl": "./src",
    "outDir": "dist"
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/__tests__",
    "**/*.test.ts",
    "**/*.spec.ts"
  ]
}
```

## Links

- https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#tsconfig-bases
- https://www.typescriptlang.org/tsconfig

# @corefront/tsconfig-preset-tools

> Corefront TypeScript preset for use in project tools

## Insall and usage

In the package directory, run:

```sh
pnpm add -D --workspace @corefront/tsconfig-preset-tools
```

and add the following `tsconfig.json` to the package directory:

```json
{
  "extends": "@corefront/tsconfig-preset-tools/default.json",
  "compilerOptions": {
    "baseUrl": "./src",
  }
}
```

## Links

- https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#tsconfig-bases
- https://www.typescriptlang.org/tsconfig

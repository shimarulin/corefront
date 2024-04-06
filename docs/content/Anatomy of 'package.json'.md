# Anatomy of 'package.json'

## Use correct PNPM version via`"packageManager"` field

Set pnpm version in project root 'package.json':

```sh
corepack use pnpm@8
```

And use:

```sh
corepack enable
```


See ["packageManager"](https://nodejs.org/docs/latest-v20.x/api/all.html#all_packages_packagemanager) and [Corepack: Configuring a package](https://nodejs.org/docs/latest-v20.x/api/corepack.html#configuring-a-package) for more info. If you previously used `corepack`, you may need to run `corepack disable` first and then `corepack enable` again.


## Package exports

See 

- [Announcing TypeScript 4.7 - TypeScript](https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/#package-json-exports-imports-and-self-referencing)
- [Package entry points](https://nodejs.org/docs/latest-v20.x/api/packages.html#package-entry-points)
- [exports](https://nodejs.org/docs/latest-v20.x/api/packages.html#exports)
- [Modules: Packages | Node.js v21.7.2 Documentation](https://nodejs.org/api/packages.html#conditional-exports)

```json title:package.json
{
    "name": "my-package",
    "type": "module",
    
    // Fall-back for older versions of TypeScript
    "types": "./dist/index.d.ts",

    // CJS fall-back for older versions of Node.js
    "main": "./dist/main.cjs",
    
    "exports": {
        ".": {
            // Entry-point for `import "my-package"` in ESM
            "import": {
                // Where TypeScript will look.
                "types": "./dist/main.d.ts",

                // Where Node.js will look.
                "default": "./dist/main.mjs"
            },
            
            // Entry-point for `require("my-package") in CJS
            "require": {
                // Where TypeScript will look.
                "types": "./dist/main.d.cts",

                // Where Node.js will look.
                "default": "./dist/main.cjs"
            },
        }
    }
}
```


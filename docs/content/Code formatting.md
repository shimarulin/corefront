# Code formatting

## package.json

Use [Syncpack](Package%20management.md#Syncpack) to format `package.json` files. Example format options config:

```json title:.syncpackrc
{
  "sortFirst": [
    "name",
    "version",
    "description",
    "license",
    "private",
    "engines",
    "os",
    "cpu",
    "repository",
    "bugs",
    "homepage",
    "author",
    "contributors",
    "keywords",
    "bin",
    "man",
    "type",
    "types",
    "main",
    "exports",
    "module",
    "browser",
    "files",
    "directories",
    "workspaces",
    "config",
    "publishConfig",
    "scripts",
    "dependencies",
    "peerDependencies",
    "devDependencies",
    "optionalDependencies",
    "bundledDependencies"
  ]
}
```


## JavaScript/TypeScript

- [ESLint Stylistic](https://eslint.style/)

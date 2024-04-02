# Package management

### Updates

TLDR:

```sh
pnpm syncpack fix-mismatches && pnpm update --recursive --latest --interactive
```

```sh
pnpm syncpack fix-mismatches && pnpm update --recursive --latest
```

## pnpm

Some benchmarks: [2024 Node.js Package Manager Guide: npm, Yarn, pnpm Compared](https://nodesource.com/blog/nodejs-package-manager-comparative-guide-2024/)

### Installation

Run in project root:

```sh
corepack enable
```

For details see [Use correct PNPM version via`"packageManager"` field](Anatomy%20of%20'package.json'.md#Use%20correct%20PNPM%20version%20via`"packageManager"`%20field).

## Syncpack

[Syncpack](https://jamiemason.github.io/syncpack/) allows you to maintain consistent dependency versions in large JavaScript monorepos.

```sh
pnpm add -D --workspace-root syncpack
```

- `pnpm syncpack list`
- `pnpm syncpack list-mismatches`
- `pnpm syncpack fix-mismatches` + `pnpm upgrade`
- `pnpm syncpack update`

### Local packages

Use "Option 1: Pin local versions to `workspace:*`" from [Local Package Versions](https://jamiemason.github.io/syncpack/guide/local-package-versions/#possible-solutions):

```json title:.syncpackrc
{
  "versionGroups": [
    {
      "label": "Use workspace protocol when developing local packages",
      "dependencies": ["@corefront/**"],
      "dependencyTypes": ["dev", "prod"],
      "pinVersion": "workspace:*"
    }
  ]
}
```

For more info see:

- [Pinned | Syncpack](https://jamiemason.github.io/syncpack/config/version-groups/pinned/)
- [dependencyTypes | Syncpack](https://jamiemason.github.io/syncpack/config/dependency-types/)

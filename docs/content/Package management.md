# Package management

### Updates

TLDR:

```sh
pnpm syncpack fix-mismatches && pnpm update --recursive --latest --interactive
```

```sh
pnpm syncpack fix-mismatches && pnpm update --recursive --latest
```

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

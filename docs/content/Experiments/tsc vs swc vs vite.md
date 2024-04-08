SWC + TSC with cache

```
tools/cli postinstall$ pnpm run build && pnpm run declaration && tsc-alias && pnpm setup && pnpm link --global
│ > @corefront/cli@1.0.0 build /home/shimarulin/Проекты/CMS/corefront/tools/cli
│ > swc --delete-dir-on-start --strip-leading-paths --out-file-extension mjs -d dist src
│ Successfully compiled: 8 files with swc (60.2ms)
│ > @corefront/cli@1.0.0 declaration /home/shimarulin/Проекты/CMS/corefront/tools/cli
│ > tsc --declaration --emitDeclarationOnly
│ No changes to the environment were made. Everything is already up to date.
│  WARN  link:/home/shimarulin/Проекты/CMS/corefront/tools/cli has no binaries
└─ Done in 4.9s
```

SWC + TSC without cache

```
tools/cli postinstall$ pnpm run build && pnpm run declaration && tsc-alias && pnpm setup && pnpm link --global
│ > @corefront/cli@1.0.0 build /home/shimarulin/Проекты/CMS/corefront/tools/cli
│ > swc --delete-dir-on-start --strip-leading-paths --out-file-extension mjs -d dist src
│ Successfully compiled: 8 files with swc (54.54ms)
│ > @corefront/cli@1.0.0 declaration /home/shimarulin/Проекты/CMS/corefront/tools/cli
│ > tsc --declaration --emitDeclarationOnly
│ No changes to the environment were made. Everything is already up to date.
│  WARN  link:/home/shimarulin/Проекты/CMS/corefront/tools/cli has no binaries
└─ Done in 5.2s
```

TSC

```
tools/cli postinstall$ npm run build && pnpm setup && pnpm link --global
│ > @corefront/cli@1.0.0 build
│ > tsc && tsc-alias
│ No changes to the environment were made. Everything is already up to date.
│  WARN  link:/home/shimarulin/Проекты/CMS/corefront/tools/cli has no binaries
└─ Done in 4.3s
```
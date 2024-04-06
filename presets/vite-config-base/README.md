# @corefront/vite-config-base

Vite configuration base types

## Install

```sh
pnpm add -D @corefront/vite-config-base
```

## Usage

Use the common types in `vite.config.ts`:

```ts
import { defineConfig, UserConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { SetupViteConfigBuilder } from '@corefront/vite-config-base'

export const defineConfigTsLib = (setup?: SetupViteConfigBuilder) => {

  return defineConfig((env) => {
    const cfg: UserConfig = {
      build: {
        minify: false,
        lib: {
          entry: 'src/main.ts',
          formats: ['es'],
          fileName: 'main'
        },
      },
    }


    return setup ? setup({ env, cfg }) : cfg
  })
}
```

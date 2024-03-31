# @corefront/vite-config-app

Vite configuration for target applications (Vue 3 + TypeScript + Vite)

## Usage

Use the default values in `vite.config.ts`:

```ts
import { createViteConfigApp } from '@corefront/vite-config-app'

// https://vitejs.dev/config/
export default createViteConfigApp()
```

Merge default Vite application configuration with custom options in `vite.config.ts`:

```sh
pnpm add -D deepmerge
```

```ts
import { createViteConfigApp } from '@corefront/vite-config-app'
import merge from 'deepmerge'

// https://vitejs.dev/config/
export default createViteConfigApp(({ cfg }) => {
  return merge(cfg, {
    build: {
      lib: {
        entry: 'src/app.ts',
      },
    },
  })
})
```

# @corefront/vite-config-app-vue

Vite configuration for target applications (Vue 3 + TypeScript + Vite)

## Usage

Use the default values in `vite.config.ts`:

```ts
import { defineConfigVueApp } from '@corefront/vite-config-app-vue'

// https://vitejs.dev/config/
export default defineConfigVueApp()
```

Merge default Vite application configuration with custom options in `vite.config.ts`:

```sh
pnpm add -D deepmerge
```

```ts
import { defineConfigVueApp } from '@corefront/vite-config-app-vue'
import merge from 'deepmerge'

// https://vitejs.dev/config/
export default defineConfigVueApp(({ cfg }) => {
  return merge(cfg, {
    build: {
      lib: {
        entry: 'src/app.ts',
      },
    },
  })
})
```

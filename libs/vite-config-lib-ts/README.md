# @corefront/vite-config-lib-ts

Vite configuration for internal libs

## Usage

Use the default values in `vite.config.ts`:

```ts
import { defineConfigTsLib } from '@corefront/vite-config-lib-ts'

// https://vitejs.dev/config/
export default defineConfigTsLib()
```

Externalise `devDependencies`:

```ts
import { defineConfigTsLib } from '@corefront/vite-config-lib-ts'
import pkg from './package.json' with { type: 'json' }

// https://vitejs.dev/config/
export default defineConfigTsLib(Object.keys(pkg.devDependencies))
```

Merge default Vite application configuration with custom options in `vite.config.ts`:

```sh
pnpm add -D deepmerge
```

```ts
import { defineConfigTsLib } from '@corefront/vite-config-lib-ts'
import merge from 'deepmerge'

// https://vitejs.dev/config/
export default defineConfigTsLib([], ({ cfg }) => {
  return merge(cfg, {
    build: {
      lib: {
        entry: 'src/app.ts',
      },
    },
  })
})
```

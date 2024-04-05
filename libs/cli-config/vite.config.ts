import { defineConfigTsLib } from '@corefront/vite-config-lib-ts'
import { fileURLToPath } from 'node:url'
import pkg from './package.json' with { type: 'json' }

// https://vitejs.dev/config/
// export default defineConfigTsLib({
//   external: Object.keys(pkg.devDependencies),
//   setup: (c) => {
//     c.cfg.resolve = {
//       alias: {
//         "~": fileURLToPath(new URL('./src', import.meta.url))
//       }
//     }

//     return c.cfg
//   }
// })
export default defineConfigTsLib({
  external: Object.keys(pkg.devDependencies)
})

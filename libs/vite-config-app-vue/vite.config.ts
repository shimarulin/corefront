import { defineConfigTsLib } from '@corefront/vite-config-lib-ts'
import pkg from './package.json' with { type: 'json' }

// https://vitejs.dev/config/
export default defineConfigTsLib(Object.keys(pkg.devDependencies))

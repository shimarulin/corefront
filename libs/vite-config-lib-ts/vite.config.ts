import { defineConfigTsLib } from './src/index'
import pkg from './package.json' with { type: 'json' }

export default defineConfigTsLib(Object.keys(pkg.devDependencies))

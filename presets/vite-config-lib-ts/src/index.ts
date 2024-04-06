import { defineConfig, UserConfig } from 'vite'
import dts from 'vite-plugin-dts'
import createExternal from 'vite-plugin-external';
import tsconfigPaths from 'vite-tsconfig-paths'
import { SetupViteConfigBuilder } from '@corefront/vite-config-base'

type DefineConfigTsLibOptions = {
  external?: string[]
  setup?: SetupViteConfigBuilder
}

export const defineConfigTsLib = ({ external, setup }: DefineConfigTsLibOptions) => {

  return defineConfig((env) => {
    const cfg: UserConfig = {
      plugins: [
        tsconfigPaths(),
        createExternal({
          nodeBuiltins: true,
          externalizeDeps: external ? external : []
        }),
        dts()
      ],
      build: {
        target: 'esnext',
        minify: false,
        lib: {
          entry: 'src/index.ts',
          formats: ['es'],
          fileName: 'index'
        },
        rollupOptions: {
          external: [
            /node_modules/
          ],
        },
      },

      // Requires "vite-tsconfig-paths" to work in shared configurations.
      // Note that 'resolve.alias[key]: value' must be an absolute path in all other cases.
      // See https://vitejs.dev/config/shared-options.html#resolve-alias
      resolve: {
        alias: {
          '~/': 'src'
        }
      }
    }

    return setup ? setup({ env, cfg }) : cfg
  })
}

import { defineConfig, UserConfig } from 'vite'
import dts from 'vite-plugin-dts'
import createExternal from 'vite-plugin-external';
import { SetupViteConfigBuilder } from '@corefront/vite-config-base'

export const defineConfigTsLib = (external: string[] = [], setup?: SetupViteConfigBuilder) => {

  return defineConfig((env) => {
    const cfg: UserConfig = {
      plugins: [
        createExternal({
          nodeBuiltins: true,
          externalizeDeps: [
            ...external
          ]
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
    }

    return setup ? setup({ env, cfg }) : cfg
  })
}

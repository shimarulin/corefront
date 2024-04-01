import { defineConfig, UserConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { SetupViteConfigBuilder } from '@corefront/vite-config-base'

export const defineConfigTsLib = (setup?: SetupViteConfigBuilder) => {

  return defineConfig((env) => {
    const cfg: UserConfig = {
      plugins: [dts()],
      build: {
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

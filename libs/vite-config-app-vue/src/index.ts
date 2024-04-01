import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { SetupViteConfigBuilder } from '@corefront/vite-config-base'

export const defineConfigVueApp = (setup?: SetupViteConfigBuilder) => {

  return defineConfig((env) => {
    const cfg: UserConfig = {
      plugins: [vue(), dts()],
      build: {
        lib: {
          entry: 'src/main.ts',
          formats: ['es']
        },
        rollupOptions: {
          external: ['vue'],
        },
      },
    }

    return setup ? setup({ env, cfg }) : cfg
  })
}

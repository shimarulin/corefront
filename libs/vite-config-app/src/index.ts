import { defineConfig, UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'


type ViteConfigAppContext = {
  env: ConfigEnv
  cfg: UserConfig
}
type SetupUserConfig = (ctx: ViteConfigAppContext) => UserConfig | Promise<UserConfig>;

// https://vitejs.dev/config/
export const createViteConfigApp = (setupUserConfig?: SetupUserConfig) => {

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


    return setupUserConfig ? setupUserConfig({ env, cfg }) : cfg
  })
}

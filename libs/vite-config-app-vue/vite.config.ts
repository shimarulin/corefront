import { defineConfig, UserConfig, ConfigEnv } from 'vite'
import dts from 'vite-plugin-dts'


type ViteConfigAppContext = {
  env: ConfigEnv
  cfg: UserConfig
}
type SetupUserConfig = (ctx: ViteConfigAppContext) => UserConfig | Promise<UserConfig>;

// https://vitejs.dev/config/
export const createViteConfigTsLib = (setupUserConfig?: SetupUserConfig) => {

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


    return setupUserConfig ? setupUserConfig({ env, cfg }) : cfg
  })
}

export default createViteConfigTsLib()

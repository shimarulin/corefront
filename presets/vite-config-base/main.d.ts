import { UserConfig, ConfigEnv } from 'vite';

export type ViteConfigBuilderContext = {
    env: ConfigEnv;
    cfg: UserConfig;
};
export type SetupViteConfigBuilder = (ctx: ViteConfigBuilderContext) => UserConfig | Promise<UserConfig>;

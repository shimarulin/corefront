import type { DefineCommandModule } from '@corefront/cli'
import { generatePackageJson, getPackageName } from '@corefront/generator-package-json';
import { templateHandler } from '~/templateHandler.mjs';

const mkplgOptionTypeChoices = [
  'generator',
] as const
type MkplgOptionTypeChoices = typeof mkplgOptionTypeChoices[keyof typeof mkplgOptionTypeChoices];

export interface MkplgOptions {
  type?: MkplgOptionTypeChoices
}

const mkplg: DefineCommandModule<unknown, MkplgOptions> = (ctx) => {
  return {
    command: '{{ commandName }}',
    describe: '{{ description }}',
    builder: (argv) => {
      return argv
        .options({
          type: {
            alias: 't',
            describe: 'Type of Corefront CLI plugin',
            choices: mkplgOptionTypeChoices,
          }
        })
    },
    handler: async (args) => {
      const baseDir = './{{ dirName }}'
      const packageJson = await generatePackageJson(ctx, baseDir)

      templateHandler(ctx, packageJson, baseDir)
    },
  }
}

export default mkplg

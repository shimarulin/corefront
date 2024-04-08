import type { DefineCommandModule } from '@corefront/cli'
import { generatePackageJson } from '@corefront/generator-package-json';

const mkplgOptionTypeChoices = [
  'generator',
] as const
type MkplgOptionTypeChoices = typeof mkplgOptionTypeChoices[keyof typeof mkplgOptionTypeChoices];

export interface MkplgOptions {
  type?: MkplgOptionTypeChoices
}

const mkplg: DefineCommandModule<unknown, MkplgOptions> = (ctx) => {
  return {
    command: 'mkplg',
    describe: 'Create new Corefront CLI plugin',
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
      // console.log('Handler in plugin >>>>>>>>>>>>>>>>>>>>>')
      // console.dir(args, { depth: null })
      console.dir(ctx, { depth: null })
      const packageJson = await generatePackageJson(ctx)
      console.dir(packageJson, { depth: null })
    },
  }
}

export default mkplg

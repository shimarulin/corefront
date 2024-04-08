import { input } from '@inquirer/prompts';
import { DefineCommandModule, getPluginPrefixes } from '@corefront/cli'

import { generatePackageJson } from '@corefront/generator-package-json';
import { templateHandler } from '~/templateHandler.mjs';

const mkplgOptionTypeChoices = [
  'generator',
  'base'
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
      const commandName: string = await input({
        message: 'Enter a new command name',
      })

      const commandDescription: string = await input({
        message: 'Enter a new command description',
      })

      const pluginPrefixes = getPluginPrefixes(ctx.packages?.root.manifest.name)

      const packageName = ``

      const baseDir = 'tools'

      // console.log('Handler in plugin >>>>>>>>>>>>>>>>>>>>>')
      // console.dir(args, { depth: null })
      // console.dir(ctx, { depth: null })
      const pkg = await generatePackageJson(ctx, baseDir, {name: commandName, description: commandDescription})


      // console.log(getPackageName('rrrertw'))
      // console.dir(packageJson, { depth: null })

      templateHandler({ ctx, pkg, commandName, baseDir })
    },
  }
}

export default mkplg

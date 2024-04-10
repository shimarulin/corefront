import { input } from '@inquirer/prompts';
import { DefineCommandModule, getPluginPrefixes } from '@corefront/cli'
import { generatePackageJson } from '@corefront/generator-package-json';
import { templateHandler } from '~/tpl.mjs';

const mkplgOptionTypeChoices = [
  'generator',
  'base'
] as const
type MkplgOptionTypeChoices = typeof mkplgOptionTypeChoices[keyof typeof mkplgOptionTypeChoices];

export interface MkplgOptions {
  name?: string,
  description?: string
  type?: MkplgOptionTypeChoices
}

const mkplg: DefineCommandModule<unknown, MkplgOptions> = (ctx) => {
  return {
    command: 'mkplg',
    describe: 'Create new Corefront CLI plugin',
    builder: (argv) => {
      return argv
        .options({
          name: {
            alias: 'n',
            describe: 'Command name',
            type: 'string'
          },
          description: {
            alias: 'd',
            describe: 'Command description',
            type: 'string'
          },
          type: {
            alias: 't',
            describe: 'Type of Corefront CLI plugin',
            choices: mkplgOptionTypeChoices,
          }
        })
    },
    handler: async (args) => {
      const commandName: string = args.name || await input({
        message: 'Enter a new command name',
      })

      const commandDescription: string = args.description || await input({
        message: 'Enter a new command description',
      })

      const packagePrefix = getPluginPrefixes(ctx.packages?.root.manifest.name).internal
      const packageName = `${packagePrefix}${commandName}`
      const baseDir = 'tools'

      const pkg = await generatePackageJson(ctx, baseDir, {name: packageName, description: commandDescription})

      templateHandler({ ctx, pkg, commandName, baseDir })
    },
  }
}

export default mkplg

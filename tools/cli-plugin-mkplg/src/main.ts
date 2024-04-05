import type { CommandModule } from 'yargs'

const mkplgOptionTypeChoices = [
  'generator',
] as const
type MkplgOptionTypeChoices = typeof mkplgOptionTypeChoices[keyof typeof mkplgOptionTypeChoices];

export interface MkplgOptions {
  type?: MkplgOptionTypeChoices
}

export const mkplg: CommandModule<unknown, MkplgOptions> = {
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
  handler: (args) => {
    console.dir(args, { depth: null })
  },
}

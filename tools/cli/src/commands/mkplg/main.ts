
import type { CommandModule } from 'yargs'
// import { printf, printdate } from '~/log.js'



const mkplgOptionTypeChoices = [
  'generator',
] as const
type MkplgOptionTypeChoices = typeof mkplgOptionTypeChoices[keyof typeof mkplgOptionTypeChoices];

export interface MkplgOptions {
  type?: MkplgOptionTypeChoices
}

export const mkplg: CommandModule<unknown, MkplgOptions> = {
  handler: (args) => {
    // printdate()
    // printf(args)
  },
  command: 'mkplg',
  describe: 'Create new Corefront CLI plugin',
  builder: (argv) => {
    // printf('builder:')
    // printf(argv)
    return argv
      .options({
        type: {
          alias: 't',
          describe: 'Type of Corefront CLI plugin',
          choices: mkplgOptionTypeChoices,
        }
      })
  }
}

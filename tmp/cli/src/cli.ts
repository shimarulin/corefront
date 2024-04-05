import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { mkplg } from '~/commands/mkplg/main.js'
import { printf } from '~/log.js'

export const run = async (): Promise<void> => {
  const cli = yargs(hideBin(process.argv))
    .scriptName('cx')
    .usage('$0 <command> [options]')
    .help('h')
    .alias('h', 'help')

  cli.command(mkplg)

  cli.command(['$0'], 'Select available command', () => {}, (args): void => {
    // Use inquirer to select command
    // log('Use inquirer to select command')
    // log(cli.config())
    // cli.showHelp()
    mkplg.handler({...args, type: 'generator'})
  })

  await cli.parse()
}

import { resolve } from 'node:path'
import select from '@inquirer/select'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import type { PackageJson } from 'type-fest'
import { printf } from '~/log.mjs'
import { getCtx } from '~/ctx.mjs'
import type { DefinedCommandModule } from '~/types.mjs'

type CommandModuleMap = {
  [key: string]: DefinedCommandModule
}
type CommandModuleChoice = {
  value: string;
  name: string;
  description: string;
};

const helpChoice: CommandModuleChoice = {
  name: 'help',
  value: 'help',
  description: 'Show help and exit',
}

export const run = async (): Promise<void> => {
  const cli = yargs(hideBin(process.argv))
    .scriptName('cx')
    .usage('$0 <command> [options]')
    .help('h')
    .alias('h', 'help')

  const commandModuleChoices: CommandModuleChoice[] = []
  const commandModuleMap: CommandModuleMap = {}

  const ctx = await getCtx()

  if (ctx.packages?.entries) {
    await Promise.all(ctx.packages?.entries
      .filter((entry) => {
        return entry.manifest.name &&
          (
            entry.manifest.name.includes('@corefront/cli-plugin') ||
            entry.manifest.name.includes('corefront-cli-plugin')
          )
      })
      .map(async (entry) => {
        class Exports implements PackageJson.ExportConditions {
          [condition: string]: PackageJson.Exports
        }

        const relativeExecPath = (
          entry.manifest.exports &&
          entry.manifest.exports instanceof Exports &&
          typeof entry.manifest.exports['.'] === 'string'
        )
          ? entry.manifest.exports['.'] as string
          : typeof entry.manifest.module === 'string'
            ? entry.manifest.module
            : undefined

        if (relativeExecPath) {
          const execPath = resolve(entry.dir, relativeExecPath)
          const esModule = await import(execPath)
          const commandModule = esModule.default(ctx) as DefinedCommandModule

          if (
            typeof commandModule.command === 'string' &&
            typeof commandModule.describe === 'string' &&
            typeof commandModule.handler === 'function'
          ) {
            commandModuleMap[commandModule.command] = commandModule

            const commandModuleChoice: CommandModuleChoice = {
              name: commandModule.command,
              value: commandModule.command,
              description: commandModule.describe,
            }

            commandModuleChoices.push(commandModuleChoice)

            cli.command(commandModule)
          } else {
            printf(`Package ${entry.pkg} is not defined correctly.`)
          }
        } else {
          printf(`The package ${entry.pkg} does not have an exported module.`)
        }
      }))

    commandModuleChoices.push(helpChoice)
  }

  cli.command(['$0'], 'Select available command', () => { }, async (args): Promise<void> => {
    const answer = await select({
      message: 'Select a command',
      choices: commandModuleChoices
    })

    if (answer === 'help') {
      cli.showHelp()
    } else {
      commandModuleMap[answer].handler(args)
    }
  })

  await cli.parse()
}

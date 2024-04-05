import type { CommandModule } from 'yargs'
import { Ctx } from '~/ctx/ctx.js';

export type CommandModuleFnObject = (env: Ctx) => CommandModule
export type CommandModuleFnPromise = (env: Ctx) => Promise<CommandModule>
export type UserConfigFn = (env: Ctx) => CommandModule | Promise<CommandModule>

export type CommandModuleExport =
| CommandModule
| Promise<CommandModule>
| CommandModuleFnObject
| CommandModuleFnPromise
| UserConfigFn


export function definePlugin(module: CommandModule): CommandModule
export function definePlugin(module: Promise<CommandModule>): Promise<CommandModule>
export function definePlugin(module: CommandModuleFnObject): CommandModuleFnObject
export function definePlugin(module: CommandModuleExport): CommandModuleExport
export function definePlugin(module: CommandModuleExport): CommandModuleExport {
  return module
}

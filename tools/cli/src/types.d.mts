import type { PackageJson } from 'type-fest'
import type { CommandModule } from 'yargs'

export type DefinedCommandModule<T = {}, U = {}> = Required<Pick<CommandModule<T, U>, 'command' | 'describe' | 'handler' | 'builder'>> & Pick<CommandModule<T, U>, 'aliases' | 'deprecated'>
export type DefineCommandModule<T = {}, U = {}> = (ctx: Ctx) => DefinedCommandModule<T, U>

export interface PackageEntryBase {
  dir: string
  pkg: string
}

export interface ProjectPackagesBase {
  root: PackageEntryBase
  current: PackageEntryBase | null
}

export interface PackageEntry extends PackageEntryBase {
  manifest: PackageJson
}

export interface ProjectPackages {
  root: PackageEntry
  current: PackageEntry | null
  entries: PackageEntry[]
}

export interface GitUser {
  name: string;
  email: string;
}

export interface GitConfig {
  user: GitUser;
  remote?: {
    origin: {
      url: string;
      fetch: string;
    };
  };
  [key: string]: unknown;
}

export interface Ctx {
  packages: ProjectPackages | null
  git: GitConfig
}

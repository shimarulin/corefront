import { basename } from 'node:path'
import { input } from '@inquirer/prompts';
import type { PackageJson } from 'type-fest'
import type { Ctx, ProjectPackages } from '@corefront/cli'

export type Repository = {
  type: string;
  url: string;

  /**
   * Relative path to package.json if it is placed in non-root directory (for example if it is part of a monorepo).
   *
   * [Read more.](https://github.com/npm/rfcs/blob/latest/implemented/0010-monorepo-subdirectory-declaration.md)
  */
  directory?: string;
}

export type GeneratedPackageJson = PackageJson & Required<Pick<PackageJson, 'name' | 'description'>>
export type PackageJsonDefaults = Pick<PackageJson, 'name' | 'description'>

export const isPackages = (input: ProjectPackages | null): input is ProjectPackages => {
  return (input as ProjectPackages) !== null
}

export const getPackageName = (name: string): string => {
  return name.split('/').pop() || ''
}

export const generatePackageJson = async (ctx: Ctx, baseDir: string = 'packages', defaults?: PackageJsonDefaults): Promise<GeneratedPackageJson> => {
  const isMonorepo: boolean = !!ctx.packages

  const scopeName: string | null = isPackages(ctx.packages)
    ? typeof ctx.packages.root.manifest.name === 'string'
      ? ctx.packages.root.manifest.name
      : await input({
        message: `Warn: field 'name' in the root package.json isn't defined. Enter a workspace name for current project`,
        default: basename(ctx.packages.root.dir)
      })
    : null

  const packageName: string = defaults?.name
    ? defaults.name
    : await input({
      message: 'Enter a package name',
      default: basename(process.cwd())
    })

  const name = isMonorepo
    ? `@${scopeName}/${packageName}`
    : packageName

  const description: string = defaults?.description
    ? defaults.description
    : await input({
      message: 'Enter a package description'
    })

  const repository: Repository = {
    type: 'git',
    url: ctx.git.remote
      ? ctx.git.remote.origin.url
      : await input({
        message: 'Enter the git url'
      })
  }

  if (isMonorepo) {
    repository.directory = `${baseDir}/${packageName}`
  }

  const author = `${ctx.git.user.name} <${ctx.git.user.email}>`

  const license = ctx.packages?.root.manifest.license || 'ISC'

  return {
    name,
    description,
    repository,
    author,
    license,
  }
}

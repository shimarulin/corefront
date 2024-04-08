import { basename } from 'node:path'
import { input } from '@inquirer/prompts';
import type { PackageJson } from 'type-fest'
import type { Ctx, ProjectPackages } from '@corefront/cli'

type Repository = {
  type: string;
  url: string;

  /**
   * Relative path to package.json if it is placed in non-root directory (for example if it is part of a monorepo).
   *
   * [Read more.](https://github.com/npm/rfcs/blob/latest/implemented/0010-monorepo-subdirectory-declaration.md)
  */
  directory?: string;
}

export const generatePackageJson = async (ctx: Ctx, baseDir: string = 'packages'): Promise<PackageJson> => {
  const checkIsProject = (input: ProjectPackages | null): input is ProjectPackages => {
    return (input as ProjectPackages) !== null
  }
  const isMonorepo: boolean = !!ctx.packages

  const workspaceName: string = checkIsProject(ctx.packages)
    ? typeof ctx.packages.root.manifest.name === 'string'
      ? ctx.packages.root.manifest.name
      : await input({
        message: `Warn: field 'name' in the root package.json isn't defined. Enter a workspace name for current project`,
        default: basename(ctx.packages.root.dir)
      })
    : await input({
      message: 'Enter a new project name',
      default: process.cwd()
    })

  const rawPackageName: string | null = isMonorepo
  ? await input({
    message: 'Enter a package name',
    default: basename(process.cwd())
  })
  : null

  const name = isMonorepo
  ? `@${workspaceName}/${rawPackageName}`
  : workspaceName

  const description: string = await input({
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
    repository.directory = `${baseDir}/${rawPackageName}`
  }

  return {
    name,
    description,
    repository,
  }
}

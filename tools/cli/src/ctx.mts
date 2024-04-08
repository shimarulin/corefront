import { ProjectPackages, getProjectPackages } from "~/pkgs.mjs";
import { GitConfig, getGitConfig } from "~/git-config-parser.mjs";

export interface Ctx {
  packages: ProjectPackages | null
  git: GitConfig
}

export const getCtx = async (cwd: string | URL = process.cwd()): Promise<Ctx> => {
  const [packages, git] = await Promise.all([
    getProjectPackages(cwd),
    getGitConfig(cwd)
  ])

  return {
    packages,
    git
  }
}

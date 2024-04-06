import { getProjectPackages } from "~/pkgs.mjs";
import type { ProjectPackages, Ctx } from '~/types.mjs'
import { getGitConfig } from "./git-config-parser.mjs";

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

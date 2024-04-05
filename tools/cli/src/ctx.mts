import { ProjectPackages, getProjectPackages } from "~/pkgs.mjs";


export interface Ctx {
  packages: ProjectPackages | null
}

export const getCtx = async (cwd: string | URL = process.cwd()): Promise<Ctx> => {
  const packages = await getProjectPackages(cwd)

  return {
    packages
  }
}

import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url';
import { ScaffoldCmdConfig, ScaffoldConfig, Scaffold } from "simple-scaffold"
import { Ctx } from '@corefront/cli';
import { getPackageName, GeneratedPackageJson, isPackages } from '@corefront/generator-package-json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const templateHandler = async (ctx: Ctx, pkg: GeneratedPackageJson, baseDir: string = './') => {
  const packageName = getPackageName(pkg.name)
  const output = isPackages(ctx.packages)
    ? resolve(ctx.packages.root.dir, baseDir)
    : resolve(process.cwd())

  const cfg: ScaffoldConfig = {
    name: packageName,
    output,
    templates: [
      resolve(__dirname, '../tpl')
    ],
    subdir: true,
  }

  await Scaffold(cfg)
}

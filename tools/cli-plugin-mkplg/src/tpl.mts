import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url';
import { writeFile } from 'node:fs/promises'
import { ScaffoldConfig, Scaffold } from "simple-scaffold"
import deepmerge from 'deepmerge';
import { Ctx } from '@corefront/cli';
import { getPackageName, GeneratedPackageJson, isPackages } from '@corefront/generator-package-json';
import { PackageJson } from 'type-fest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export type CommandInit = {
  name: string
}

export type TemplateContext = {
  commandName: string
  baseDir?: string
  ctx: Ctx
  pkg: GeneratedPackageJson
}


export const templateHandler = async ({ ctx, pkg, baseDir = '', commandName }: TemplateContext) => {
  const packageName = getPackageName(pkg.name)
  const output = isPackages(ctx.packages)
    ? resolve(ctx.packages.root.dir, baseDir)
    : resolve(process.cwd())

  const cfg: ScaffoldConfig = {
    name: packageName,
    output,
    templates: [
      resolve(__dirname, '../tpls/generator')
    ],
    subdir: false,
    data: {
      ctx,
      pkg,
      commandName,
    },
    logLevel: 'warning'
  }

  const pkgExtends: PackageJson = {
    "type": "module",
    "exports": {
      ".": {
        "import": {
          "import": "./dist/main.mjs"
        }
      }
    },
    "files": [
      "dist"
    ],
    "scripts": {
      "build": "swc --delete-dir-on-start --strip-leading-paths --out-file-extension mjs -d dist src",
      "dev": "pnpm run build --watch",
      "postinstall": "pnpm run build"
    },
    "dependencies": {
      "@corefront/generator-package-json": "workspace:*",
      "@inquirer/prompts": "^4.3.2",
      "deepmerge": "^4.3.1",
      "simple-scaffold": "^2.2.0"
    },
    "devDependencies": {
      "@corefront/cli": "workspace:*",
      "@corefront/tsconfig-preset-tools": "workspace:*",
      "@swc/cli": "^0.3.12",
      "@swc/core": "^1.4.11",
      "@types/yargs": "^17.0.32",
      "chokidar": "^3.6.0",
      "type-fest": "^4.15.0"
    }
  }

  const pkgResult = deepmerge(pkgExtends, pkg)
  const pkgContent: string = JSON.stringify(pkgResult, null, 2)

  await Scaffold(cfg)
  await writeFile(resolve(output, packageName, './package.json'), pkgContent, {encoding: 'utf-8'})
  // syncpack format "--source" "/home/<some_path>/corefront/tools/<pkgName>/package.json"
}

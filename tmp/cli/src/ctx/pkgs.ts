import { dirname } from 'node:path'
import readdirp from 'readdirp'
import type { PackageJson } from 'type-fest'
import { findPackageEntryUp, PackageEntryBase } from '~/ctx/pkg.js'

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

export const findProjectPackagesBase = async (cwd: string | URL = process.cwd()): Promise<ProjectPackagesBase | null> => {
  const currentPackageEntry = await findPackageEntryUp(cwd)
  const parentPackageEntry = currentPackageEntry
  ? await findPackageEntryUp(dirname(currentPackageEntry?.dir))
  : null

  return parentPackageEntry
    ? {
        root: parentPackageEntry,
        current: currentPackageEntry
      }
    : currentPackageEntry
      ? {
          root: currentPackageEntry,
          current: null
        }
      : null
}

export const findPackageEntryBaseList = async (dir: string): Promise<PackageEntryBase[]> => {
  const entryInfoList = await readdirp.promise(dir, {
    fileFilter: 'package.json',
    directoryFilter: [
      '!.git',
      '!node_modules'
    ]
  })

  return entryInfoList.map(entryInfo => ({
    dir: dirname(entryInfo.fullPath),
    pkg: entryInfo.fullPath
  }))
}

export const getPackageEntryList = async (packageEntryList: PackageEntryBase[]): Promise<PackageEntry[]> => {
  return Promise.all(packageEntryList.map(async ({dir, pkg}): Promise<PackageEntry> => {
    const manifest = await import(pkg, {with: { type: "json" }}).then(module => {
      return module.default as PackageJson
    })
    return {
      dir,
      pkg,
      manifest,
    }
  }))
}

export const getProjectPackages = async (cwd: string | URL = process.cwd()): Promise<ProjectPackages | null> => {
  const projectPackagesBase = await findProjectPackagesBase(cwd)
  const entries = projectPackagesBase
  ? await getPackageEntryList(await findPackageEntryBaseList(projectPackagesBase.root.dir))
  : []


  return projectPackagesBase
    ? {
    root: projectPackagesBase.root && {
      ...projectPackagesBase.root,
      manifest: entries.find(entry => entry.pkg === projectPackagesBase.root.pkg)?.manifest || {},
    },
    current: projectPackagesBase.current && {
      ...projectPackagesBase.current,
      manifest: entries.find(entry => entry.pkg === projectPackagesBase.current?.pkg)?.manifest || {},
    },
    entries
  }
  : null
}

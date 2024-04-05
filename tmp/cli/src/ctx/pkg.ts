import path from 'node:path'
import { findUp } from 'find-up'

export interface PackageEntryBase {
  dir: string
  pkg: string
}

export const findPackageEntryUp = async (cwd: string | URL = process.cwd()): Promise<PackageEntryBase | null> => {
  const currentPackage = await findUp('package.json', {
    cwd,
  })

  return currentPackage ? {
    dir: path.dirname(currentPackage),
    pkg: currentPackage
  } : null
}

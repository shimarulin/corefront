import { dirname } from 'node:path'
import { findUp } from 'find-up'
import type { PackageEntryBase } from '~/types.mjs'

export const findPackageEntryUp = async (cwd: string | URL = process.cwd()): Promise<PackageEntryBase | null> => {
  const currentPackage = await findUp('package.json', {
    cwd,
  })

  return currentPackage ? {
    dir: dirname(currentPackage),
    pkg: currentPackage
  } : null
}

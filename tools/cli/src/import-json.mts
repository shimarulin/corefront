import { PackageJson } from "type-fest"
import { readFile } from 'node:fs/promises';

export const importPackageJson = async (fullPath: string): Promise<PackageJson> => JSON.parse(await readFile(fullPath, { encoding: 'utf8' }))

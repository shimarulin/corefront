import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url';

export const run = async (): Promise<void> => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const projectRoot = resolve(__dirname, '../../../')

  console.log(projectRoot)
  // const pkg = await import(resolve(__dirname, '../package.json'), {with: {type: 'json'}})

  // console.log(pkg)
  console.log('Hello from upd CLI!')
}

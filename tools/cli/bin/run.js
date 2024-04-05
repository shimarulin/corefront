#!/usr/bin/env node
try {
  await (await import('../dist/cli.mjs')).run()
} catch (e) {
  console.dir(e)
}

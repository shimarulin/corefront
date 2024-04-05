#!/usr/bin/env node
try {
  await (await import('../dist/cli.js')).run()
} catch (e) {
  console.dir(e)
}

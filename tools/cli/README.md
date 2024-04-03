# @corefront/cli

> Command line tool for Corefront project maintenance

## Install

### Project

In project root

```sh
pnpm add -D --workspace-root --workspace @corefront/cli
```

### Global

Make sure that pnpm global bin directory is exist

```sh
pnpm setup
```

Run this command in the package directory

```sh
pnpm link --global
```

## Usage

Run command by `npx` for local installation

```sh
npx cx
```

or directly for global

```sh
cx
```


## Uninstall

### Global

```sh
pnpm uninstall --global @corefront/cli
```

## Common issues

### WARN link:...corefront/tools/cli has no binaries

`pnpm link --global` show warning:

```
WARN  link:/home/username/corefront/tools/cli has no binaries
```

Don't worry, everything just works. See https://github.com/pnpm/pnpm/issues/4761 for updates.

### `cx` is stil present after `pnpm uninstall --global @corefront/cli`

Sometime this happens, use:

```sh
rm -f "$(pnpm bin -g)/cx"
```

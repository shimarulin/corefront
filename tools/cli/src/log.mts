export const log = (input: any) => {
  console.log(input)
}

export const warn = (input: any) => {
  console.log(input)
}

export const info = (input: any) => {
  console.log(input)
}

export const error = (input: any) => {
  console.log(input)
}

export const printf = (input: any) => {
  console.dir(input, { depth: null })
}

export const printdate = (prefix: string = '\n', postfix: string = ':' ) => {
  console.log(`${prefix}${new Date().toUTCString()}${postfix}`)
}

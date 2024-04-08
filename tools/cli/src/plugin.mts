export interface PluginPrefixMap {
  internal: string
  external: string
}

export const getPluginPrefixes = (scope: string = 'corefront'): PluginPrefixMap => {
  return {
    internal: `@${scope}/cli-plugin-`,
    external: `${scope}-cli-plugin-`
  }
}

export function createNamespace(name: string) {
  const prefixedName = `Pd${name}`
  return [prefixedName] as const
}

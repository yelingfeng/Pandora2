
export function createNamespace(name: string) {
  const prefixedName = `pandora-${name}`;
  return [
    prefixedName,
  ] as const;
}
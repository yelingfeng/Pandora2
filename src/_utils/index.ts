export * from './propTypes'
export * from './withInstall'
export * from './props'
export * from './log'

/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body
}

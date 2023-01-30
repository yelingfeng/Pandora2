import installer from './pandora/defaults'
export * from '@pandora/components'
export * from '@pandora/hooks'
export * from '@pandora/pandora/make-installer'

export const install = installer.install
export const version = installer.version
export default installer

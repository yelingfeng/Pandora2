import installer from './pandora/defaults'
export * from './components'
export * from './hooks'
export * from './pandora/make-installer'

export const install = installer.install
export const version = installer.version
export default installer

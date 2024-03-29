/**
 * Mock plugin for development and production.
 * https://github.com/anncwb/vite-plugin-mock
 */
import { viteMockServe } from 'vite-plugin-mock'

export function configMockPlugin() {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    localEnabled: true,
    prodEnabled: false,
    injectCode: `
       import { setupProdMockServer } from '../mock/_createProductionServer';
 
       setupProdMockServer();
       `
  })
}

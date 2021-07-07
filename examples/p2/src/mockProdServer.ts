import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import tableMock from './mock/tableTest'

export const mockModules = [...tableMock]

export function setupProdMockServer() {
  createProdMockServer(mockModules)
}

import { contextBridge } from 'electron'

import { document } from './api/documents'
import { print } from './api/print'
import { trash } from './api/trash'

declare global {
  export interface Window {
    api: typeof api
  }
}

// Custom APIs for renderer
const api = Object.assign({}, document, trash, print)

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.api = api
}

import { contextBridge } from 'electron'

import { document } from './api/documents'
import { print } from './api/print'
import { trash } from './api/trash'
import { updater } from './api/update'

declare global {
  export interface Window {
    api: typeof api
  }
}

// Custom APIs for renderer
const api = { document, trash, print, update: updater }

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.api = api
}

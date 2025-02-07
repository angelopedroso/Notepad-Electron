import { contextBridge, ipcRenderer } from 'electron'

import { IPC } from '@/shared/constants/ipc'
import {
  CreateDocumentResponse,
  DeleteDocumentRequest,
  FetchAllDocumentsResponse,
  FetchDocumentRequest,
  FetchDocumentResponse,
  SaveDocumentRequest,
} from '~/src/shared/types/ipc/documents'

import {
  DeleteTrashRequest,
  FetchAllTrashesResponse,
  RestoreDocumentFromTrashRequest,
} from '../shared/types/ipc/trash'

declare global {
  export interface Window {
    api: typeof api
  }
}

// Custom APIs for renderer
const api = {
  fetchDocuments(): Promise<FetchAllDocumentsResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH_ALL)
  },
  fetchDocument(req: FetchDocumentRequest): Promise<FetchDocumentResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH, req)
  },
  createDocument(): Promise<CreateDocumentResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.CREATE)
  },
  saveDocument(req: SaveDocumentRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.SAVE, req)
  },
  deleteDocument(req: DeleteDocumentRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.DELETE, req)
  },

  onNewDocumentRequest(callback: () => void) {
    ipcRenderer.on('new-document', callback)

    return () => {
      ipcRenderer.off('new-document', callback)
    }
  },

  fetchTrashes(): Promise<FetchAllTrashesResponse> {
    return ipcRenderer.invoke(IPC.TRASH.FETCH_ALL)
  },
  restoreDocumentFromTrash(
    req: RestoreDocumentFromTrashRequest,
  ): Promise<void> {
    return ipcRenderer.invoke(IPC.TRASH.RESTORE, req)
  },
  deleteTrash(req: DeleteTrashRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.TRASH.DELETE, req)
  },

  printHTML(htmlContent: string): Promise<void> {
    return ipcRenderer.invoke(IPC.PRINT.PRINT_HTML, htmlContent)
  },
  saveAsPDF(htmlContent: string): Promise<void> {
    return ipcRenderer.invoke(IPC.PRINT.SAVE_PDF, htmlContent)
  },
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.api = api
}

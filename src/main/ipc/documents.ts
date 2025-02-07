import { randomUUID } from 'node:crypto'

import { ipcMain } from 'electron'

import { IPC } from '~/src/shared/constants/ipc'
import { NotFoundExpection } from '~/src/shared/errors/not-found-expection'
import {
  CreateDocumentResponse,
  DeleteDocumentRequest,
  Document,
  FetchAllDocumentsResponse,
  FetchDocumentRequest,
  FetchDocumentResponse,
  SaveDocumentRequest,
} from '~/src/shared/types/ipc/documents'

import { store } from '../store'

ipcMain.handle(
  IPC.DOCUMENTS.FETCH_ALL,
  async (): Promise<FetchAllDocumentsResponse> => {
    return {
      data: Object.values(store.get('documents')),
    }
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.FETCH,
  async (_, { id }: FetchDocumentRequest): Promise<FetchDocumentResponse> => {
    const document = store.get(`documents.${id}`) as Document

    return {
      data: document,
    }
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.CREATE,
  async (): Promise<CreateDocumentResponse> => {
    const id = randomUUID()

    const document: Document = {
      id,
      title: 'Untitled',
    }

    store.set(`documents.${id}`, document)

    return {
      data: document,
    }
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.SAVE,
  async (_, { id, title, content }: SaveDocumentRequest): Promise<void> => {
    store.set(`documents.${id}`, {
      id,
      title,
      content,
    })
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.DELETE,
  async (_, { id }: DeleteDocumentRequest): Promise<void> => {
    const document = store.get(`documents.${id}`) as Document

    if (!document) {
      throw new NotFoundExpection('Documento')
    }

    store.set(`trash.${id}`, document)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    store.delete(`documents.${id}`)
  },
)

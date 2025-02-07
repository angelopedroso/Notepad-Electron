import { ipcMain } from 'electron'

import { IPC } from '~/src/shared/constants/ipc'
import { NotFoundExpection } from '~/src/shared/errors/not-found-expection'
import {
  DeleteTrashRequest,
  FetchAllTrashesResponse,
  RestoreDocumentFromTrashRequest,
  Trash,
} from '~/src/shared/types/ipc/trash'

import { store } from '../store'

ipcMain.handle(
  IPC.TRASH.FETCH_ALL,
  async (): Promise<FetchAllTrashesResponse> => {
    return {
      data: Object.values(store.get('trash')),
    }
  },
)

ipcMain.handle(
  IPC.TRASH.RESTORE,
  async (_, { id }: RestoreDocumentFromTrashRequest): Promise<void> => {
    const document = store.get(`trash.${id}`) as Trash

    if (!document) {
      throw new NotFoundExpection('Documento')
    }

    store.set(`documents.${id}`, document)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    store.delete(`trash.${id}`)
  },
)

ipcMain.handle(
  IPC.TRASH.DELETE,
  async (_, { id }: DeleteTrashRequest): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    store.delete(`trash.${id}`)
  },
)

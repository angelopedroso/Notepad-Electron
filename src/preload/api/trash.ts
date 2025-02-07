import { ipcRenderer } from 'electron'

import { IPC } from '~/src/shared/constants/ipc'
import {
  DeleteTrashRequest,
  FetchAllTrashesResponse,
  RestoreDocumentFromTrashRequest,
} from '~/src/shared/types/ipc/trash'

export const trash = {
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
}

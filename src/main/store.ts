import Store from 'electron-store'

import { Document } from '~/src/shared/types/ipc/documents'
import { Trash } from '~/src/shared/types/ipc/trash'

interface StoreType {
  documents: Record<string, Document>
  trash: Record<string, Trash>
}

export const store = new Store<StoreType>({
  defaults: {
    documents: {},
    trash: {},
  },
})

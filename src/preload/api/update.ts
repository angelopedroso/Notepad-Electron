import { ipcRenderer } from 'electron'

import { UpdaterDataCallbackResponse } from '~/src/shared/types/preload/updater'

export const updater = {
  onUpdateDownloaded: (
    callback: (data: UpdaterDataCallbackResponse) => void,
  ) => {
    ipcRenderer.on(
      'update-downloaded',
      (_, data: UpdaterDataCallbackResponse) => callback(data),
    )

    return () => {
      ipcRenderer.off('update-downloaded', () => callback)
    }
  },
  installNewVersion: () => ipcRenderer.send('confirmed-update'),
}

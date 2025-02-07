import { BrowserWindow, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'

export function createUpdater(window: BrowserWindow) {
  autoUpdater.on('update-downloaded', (e) => {
    window.webContents.send('update-downloaded', {
      name: e.releaseName,
      version: e.version,
    })
  })

  ipcMain.on('confirmed-update', () => {
    autoUpdater.quitAndInstall()
  })
}

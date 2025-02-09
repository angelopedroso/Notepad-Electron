import { BrowserWindow, ipcMain, Notification } from 'electron'
import { autoUpdater } from 'electron-updater'

import trayIcon from '~/resources/icon.png'

export function createUpdater(window: BrowserWindow) {
  autoUpdater.on('update-available', (info) => {
    new Notification({
      icon: trayIcon,
      closeButtonText: 'Fechar',
      title: 'Uma nova versão está disponível!',
      body: `A versão ${info.version} já está disponível 🤩, atualize para ver as novidades!`,
    }).show()
  })

  autoUpdater.on('update-downloaded', (e) => {
    window.webContents.send('update-downloaded', {
      name: e.releaseName,
      version: e.version,
    })
  })

  ipcMain.on('confirmed-update', () => {
    autoUpdater.quitAndInstall(true, true)
  })
}

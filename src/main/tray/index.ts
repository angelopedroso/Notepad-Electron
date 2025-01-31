import { BrowserWindow, Menu, nativeTheme, Tray } from 'electron'
import path from 'node:path'
import { trayEvents } from './events'

export function createTray(window: BrowserWindow) {
  const isDarkMode = nativeTheme.shouldUseDarkColors

  const isMacOS = process.platform === 'darwin'

  const iconPath = isDarkMode
    ? path.resolve(__dirname, 'icons', 'trayWindowsWhite.ico')
    : path.resolve(__dirname, 'icons', 'trayWindowsDark.ico')

  const icon = isMacOS
    ? path.resolve(__dirname, 'icons', 'rotionTemplate@2x.png')
    : iconPath

  const tray = new Tray(icon)

  const menu = Menu.buildFromTemplate([
    { label: 'Rotion', enabled: false },
    { type: 'separator' },
    {
      label: 'Criar novo documento',
      click: () => {
        window.webContents.send('new-document')

        window.show()
      },
    },
    { type: 'separator' },
    {
      label: 'Sair',
      role: 'quit',
    },
  ])

  tray.setTitle('Rotion')
  tray.setToolTip('Rotion')
  tray.setContextMenu(menu)

  trayEvents({ tray, menu, window })
}

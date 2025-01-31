import { BrowserWindow, Menu, Tray } from 'electron'

interface TrayEventsParams {
  tray: Tray
  menu: Menu
  window: BrowserWindow
}

export function trayEvents({ tray, menu, window }: TrayEventsParams) {
  let clickTimeout: NodeJS.Timeout | null = null

  tray.on('click', () => {
    if (clickTimeout) {
      clearTimeout(clickTimeout)
      clickTimeout = null
      return
    }

    clickTimeout = setTimeout(() => {
      tray.popUpContextMenu(menu)
      clickTimeout = null
    }, 300)
  })

  tray.on('double-click', () => {
    if (clickTimeout) {
      clearTimeout(clickTimeout)
      clickTimeout = null
    }

    window.show()
  })
}

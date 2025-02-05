import { app, BrowserWindow } from 'electron'

export function createWindowEvents(window: BrowserWindow) {
  window.on('close', (event) => {
    event.preventDefault()
    window.hide()
  })

  window.on('show', () => {
    if (app.dock) {
      app.dock.show()
    }

    window.setSkipTaskbar(false)
  })

  window.on('hide', () => {
    if (app.dock) {
      app.dock.hide()
    }

    window.setSkipTaskbar(true)
  })
}

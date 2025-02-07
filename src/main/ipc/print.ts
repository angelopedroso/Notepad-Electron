import fs from 'node:fs'
import path from 'node:path'

import { app, BrowserWindow, ipcMain } from 'electron'

import { IPC } from '@/shared/constants/ipc'
import { getFullHTML } from '~/src/shared/constants/html-template'

ipcMain.handle(IPC.PRINT.PRINT_HTML, (event, htmlContent) => {
  let tmpWindow: BrowserWindow | null = new BrowserWindow({
    show: false,
    webPreferences: {
      contextIsolation: true,
    },
  })

  const fullHTML = getFullHTML(htmlContent)

  tmpWindow.loadURL(
    'data:text/html;charset=utf-8,' + encodeURIComponent(fullHTML),
  )

  tmpWindow.webContents.on('did-finish-load', () => {
    tmpWindow?.webContents.print({}, (success, failureReason) => {
      if (!success) console.error('Falha ao imprimir:', failureReason)
      tmpWindow?.close()
      tmpWindow = null
    })
  })
})

ipcMain.handle(IPC.PRINT.SAVE_PDF, (event, htmlContent: string) => {
  const tmpWindow: BrowserWindow | null = new BrowserWindow({
    show: false,
    webPreferences: {
      contextIsolation: true,
    },
  })

  const fullHTML = getFullHTML(htmlContent)

  tmpWindow.loadURL(
    'data:text/html;charset=utf-8,' + encodeURIComponent(fullHTML),
  )

  tmpWindow.webContents.on('did-finish-load', async () => {
    const pdfBuffer = await tmpWindow.webContents.printToPDF({})
    const contentRegex = /(<h1>(?<title>.+)<\/h1>(?<content>.+)?)/

    const parsedContent = htmlContent.match(contentRegex)?.groups

    const title = parsedContent?.title ?? 'Untitled'

    const documentsPath = app.getPath('documents')

    const customFolder = path.join(documentsPath, 'Rotion')

    if (!fs.existsSync(customFolder)) {
      fs.mkdirSync(customFolder, { recursive: true })
    }

    const filePath = path.join(customFolder, `${title.toLowerCase()}.pdf`)

    fs.writeFileSync(filePath, pdfBuffer)

    tmpWindow.close()
  })
})

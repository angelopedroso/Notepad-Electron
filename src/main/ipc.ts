import { app, BrowserWindow, ipcMain } from 'electron'
import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { IPC } from '@shared/constants/ipc'
import {
  CreateDocumentResponse,
  DeleteDocumentRequest,
  Document,
  FetchAllDocumentsResponse,
  FetchDocumentRequest,
  FetchDocumentResponse,
  SaveDocumentRequest,
} from '@shared/types/ipc'
import { store } from './store'
import { getFullHTML } from '../shared/constants/html-template'

ipcMain.handle(
  IPC.DOCUMENTS.FETCH_ALL,
  async (): Promise<FetchAllDocumentsResponse> => {
    return {
      data: Object.values(store.get('documents')),
    }
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.FETCH,
  async (_, { id }: FetchDocumentRequest): Promise<FetchDocumentResponse> => {
    const document = store.get(`documents.${id}`) as Document

    return {
      data: document,
    }
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.CREATE,
  async (): Promise<CreateDocumentResponse> => {
    const id = randomUUID()

    const document: Document = {
      id,
      title: 'Untitled',
    }

    store.set(`documents.${id}`, document)

    return {
      data: document,
    }
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.SAVE,
  async (_, { id, title, content }: SaveDocumentRequest): Promise<void> => {
    store.set(`documents.${id}`, {
      id,
      title,
      content,
    })
  },
)

ipcMain.handle(
  IPC.DOCUMENTS.DELETE,
  async (_, { id }: DeleteDocumentRequest): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    store.delete(`documents.${id}`)
  },
)

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

  tmpWindow.webContents.print({}, (success, failureReason) => {
    if (!success) console.error('Falha ao imprimir:', failureReason)
    tmpWindow?.close()
    tmpWindow = null
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

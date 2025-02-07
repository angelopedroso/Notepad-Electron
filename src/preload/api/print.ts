import { ipcRenderer } from 'electron'

import { IPC } from '~/src/shared/constants/ipc'

export const print = {
  printHTML(htmlContent: string): Promise<void> {
    return ipcRenderer.invoke(IPC.PRINT.PRINT_HTML, htmlContent)
  },
  saveAsPDF(htmlContent: string): Promise<void> {
    return ipcRenderer.invoke(IPC.PRINT.SAVE_PDF, htmlContent)
  },
}

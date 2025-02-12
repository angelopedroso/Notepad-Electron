import * as Collapsible from '@radix-ui/react-collapsible'
import { useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import { CaretDoubleRight, Code, Printer, TrashSimple } from 'phosphor-react'
import { use } from 'react'
import { useParams } from 'react-router-dom'

import { useDeleteDocument } from '../../api/electron/hooks/delete-document'
import { EditorContext } from '../../contexts/editor-context'
import * as Breadcrumbs from './Breadcrumbs'

interface HeaderProps {
  isSidebarOpen: boolean
}

export function Header({ isSidebarOpen }: HeaderProps) {
  const { id } = useParams<{ id: string }>()

  const editor = use(EditorContext)

  const isMacOS = process.platform === 'darwin'

  const { deleteDocument, isDeletingDocument } = useDeleteDocument(id!)

  const { mutateAsync: printDocument, isPending: isPrintingDocument } =
    useMutation({
      mutationFn: async () => {
        const htmlContent = editor.HTMLContent

        if (htmlContent) {
          await window.api.print.printHTML(htmlContent)
        }
      },
    })

  return (
    <div
      className={clsx(
        'border-b border-border h-14 py-[1.125rem] px-6 flex items-center gap-4 leading-tight transition-all duration-250',
        {
          'pl-24': !isSidebarOpen && isMacOS,
          'w-screen': !isSidebarOpen,
          'w-[calc(100vw-240px)]': isSidebarOpen,
          'region-drag': isMacOS,
          'justify-between': id && !isSidebarOpen,
          'justify-end': id && isSidebarOpen,
        },
      )}
    >
      <Collapsible.Trigger
        className={clsx(
          'h-5 w-5 text-foreground hover:text-accent-foreground',
          {
            hidden: isSidebarOpen,
            block: !isSidebarOpen,
          },
        )}
      >
        <CaretDoubleRight className="h-4 w-4" />
      </Collapsible.Trigger>

      {id && (
        <div className="inline-flex region-no-drag gap-3">
          <button
            className="inline-flex items-center gap-1 text-rotion-100 text-sm hover:text-accent-foreground"
            onClick={() => printDocument()}
            disabled={isPrintingDocument}
          >
            <Printer className="size-4" />
            Imprimir
          </button>
          <button
            onClick={() => deleteDocument()}
            disabled={isDeletingDocument}
            className="inline-flex items-center gap-1 text-rotion-100 text-sm hover:text-accent-foreground"
          >
            <TrashSimple className="h-4 w-4" />
            Apagar
          </button>
        </div>
      )}
    </div>
  )
}

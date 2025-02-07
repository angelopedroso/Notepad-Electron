import clsx from 'clsx'
import { Code, CaretDoubleRight, TrashSimple, Printer } from 'phosphor-react'

import * as Collapsible from '@radix-ui/react-collapsible'
import * as Breadcrumbs from './Breadcrumbs'
import { useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { use } from 'react'
import { EditorContext } from '../../contexts/editor-context'
import { useDeleteDocument } from '../../api/electron/hooks/delete-document'

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
          await window.api.printHTML(htmlContent)
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
        <>
          <Breadcrumbs.Root>
            <Breadcrumbs.Item>
              <Code weight="bold" className="h-4 w-4 text-pink-500" />
              Estrutura técnica
            </Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <Breadcrumbs.HiddenItems />
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item>Back-end</Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item isActive>Untitled</Breadcrumbs.Item>
          </Breadcrumbs.Root>

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
        </>
      )}
    </div>
  )
}

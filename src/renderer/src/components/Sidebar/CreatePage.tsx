import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'phosphor-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Document } from '~/src/shared/types/ipc/documents'

export function CreatePage() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutateAsync: createDocument, isPending: isCreatingNewDocument } =
    useMutation({
      mutationFn: async () => {
        const response = await window.api.document.createDocument()

        return response.data
      },
      onSuccess(data) {
        queryClient.setQueryData(['documents'], (documents: Document[]) => {
          return [...documents, data]
        })

        navigate(`/documents/${data.id}`)
      },
    })

  useEffect(() => {
    function onNewDocument() {
      createDocument()
    }

    const unsubscribe = window.api.document.onNewDocumentRequest(onNewDocument)

    return () => {
      unsubscribe()
    }
  }, [createDocument])

  return (
    <button
      onClick={() => createDocument()}
      disabled={isCreatingNewDocument}
      className="flex w-[240px] px-5 items-center text-sm gap-2 absolute bottom-0 left-0 right-0 py-4 border-t border-border hover:bg-rotion-700 disabled:opacity-60"
    >
      <Plus className="h-4 w-4" />
      Novo documento
    </button>
  )
}

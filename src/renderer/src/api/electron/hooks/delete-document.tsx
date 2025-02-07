import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Document } from '~/src/shared/types/ipc/documents'

export function useDeleteDocument(id: string) {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { mutateAsync: deleteDocument, isPending: isDeletingDocument } =
    useMutation({
      mutationFn: async () => {
        await window.api.deleteDocument({ id })
      },
      onSuccess() {
        queryClient.setQueryData<Document[]>(['documents'], (documents) => {
          return documents?.filter((document) => document.id !== id)
        })

        navigate('/')
      },
    })

  return {
    deleteDocument,
    isDeletingDocument,
  }
}

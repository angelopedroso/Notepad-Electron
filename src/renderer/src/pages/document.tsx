import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { Document as DocumentType } from '~/src/shared/types/ipc/documents'

import { Editor, OnContentUpdatedParams } from '../components/Editor'

export function Document() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()

  const { data, isFetching } = useQuery({
    queryKey: ['documents', id],
    queryFn: async () => {
      const response = await window.api.document.fetchDocument({ id: id! })

      return response.data
    },
  })

  const { mutateAsync: saveDocument } = useMutation({
    mutationFn: async ({ title, content }: OnContentUpdatedParams) => {
      await window.api.document.saveDocument({
        id: id!,
        title,
        content,
      })
    },
    onSuccess(_, variables) {
      queryClient.setQueryData<DocumentType[]>(['documents'], (documents) => {
        return documents?.map((document) => {
          if (document.id === id) {
            return { ...document, title: variables.title }
          }

          return document
        })
      })
    },
  })

  const initialContent = useMemo(() => {
    if (data) {
      return `<h1>${data.title}</h1>${data.content ?? '<p></p>'}`
    }

    return ''
  }, [data])

  function handleEditorContentUpdated({
    title,
    content,
  }: OnContentUpdatedParams) {
    saveDocument({ title, content })
  }

  return (
    <main className="flex-1 flex py-12 px-10 gap-8 overflow-hidden">
      {!isFetching && data && (
        <Editor
          content={initialContent}
          onContentUpdated={handleEditorContentUpdated}
        />
      )}
    </main>
  )
}

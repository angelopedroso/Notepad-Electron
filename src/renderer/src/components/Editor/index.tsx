import Document from '@tiptap/extension-document'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Typography from '@tiptap/extension-typography'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { use } from 'react'

import { EditorContext } from '../../contexts/editor-context'

export interface OnContentUpdatedParams {
  title: string
  content: string
}

interface EditorProps {
  content: string
  onContentUpdated: (params: OnContentUpdatedParams) => void
}

export function Editor({ content, onContentUpdated }: EditorProps) {
  const { setHTMLContent } = use(EditorContext)

  const editor = useEditor({
    extensions: [
      Document.extend({
        content: 'heading block*',
      }),
      TaskList.configure(),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: 'custom-task-item',
        },
      }),
      StarterKit.configure({
        document: false,
      }),
      Highlight,
      Typography,
      Placeholder.configure({
        placeholder: 'Untitled',
        emptyEditorClass:
          'before:content-[attr(data-placeholder)] before:text-gray-500 before:h-0 before:float-left before:pointer-events-none',
      }),
    ],
    onUpdate({ editor }) {
      const contentRegex = /(<h1>(?<title>.+)<\/h1>(?<content>.+)?)/

      const parsedContent = editor.getHTML().match(contentRegex)?.groups

      const title = parsedContent?.title ?? 'Untitled'
      const content = parsedContent?.content ?? ''

      onContentUpdated({ title, content })
      setHTMLContent(editor.getHTML())
    },
    onCreate({ editor }) {
      setHTMLContent(editor.getHTML())
    },
    content,
    autofocus: 'end',
    editorProps: {
      attributes: {
        class:
          'focus:outline-none prose prose-invert prose-headings:mt-0 h-full',
      },
    },
  })

  return (
    <EditorContent className="w-[55ch] xl:w-[65ch] h-full" editor={editor} />
  )
}

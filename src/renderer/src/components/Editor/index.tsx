import Document from '@tiptap/extension-document'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Typography from '@tiptap/extension-typography'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TableOfContents, {
  getHierarchicalIndexes,
  TableOfContentData,
} from '@tiptap-pro/extension-table-of-contents'
import { use, useState } from 'react'

import { EditorContext } from '../../contexts/editor-context'
import { ToC } from '../ToC'
import { Separator } from '../ui/separator'

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

  const [tocItems, setToCItems] = useState<TableOfContentData>()

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
      TableOfContents.configure({
        getIndex: getHierarchicalIndexes,
        onUpdate(data) {
          setToCItems(data)
        },
      }),
    ],
    onUpdate({ editor }) {
      const contentRegex = /<h1[^>]*>(?<title>.+?)<\/h1>(?<content>.+)?/

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
    <>
      <aside className="hidden basis-1/5 lg:block sticky top-0">
        <span className="text-rotion-300 font-semibold text-xs">
          TABELA DE CONTEÚDO
        </span>

        <ToC editor={editor} items={tocItems} />
      </aside>

      <Separator orientation="vertical" className="hidden lg:block" />

      <section className="no-scroll basis-4/5 flex-1 flex flex-col items-center overflow-y-auto py-4">
        <EditorContent className="size-full w-[55ch]" editor={editor} />
      </section>
    </>
  )
}

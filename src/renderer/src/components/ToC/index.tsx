import { TextSelection } from '@tiptap/pm/state'
import { Editor } from '@tiptap/react'
import { TableOfContentData } from '@tiptap-pro/extension-table-of-contents'
import { memo, MouseEvent } from 'react'

import { ToCLink } from './Link'

interface ToCProps {
  editor: Editor | null
  items?: TableOfContentData
}

export const ToC = memo(({ editor, items }: ToCProps) => {
  const onItemClick = (
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    id: string,
  ) => {
    e.preventDefault()

    if (editor) {
      const element = editor.view.dom.querySelector(`[data-toc-id="${id}"`)

      if (element) {
        const pos = editor.view.posAtDOM(element!, 0)

        const doc = editor.view.state.doc
        const endPos = doc.resolve(pos + element.textContent!.length)
        const tr = editor.view.state.tr

        tr.setSelection(TextSelection.create(doc, endPos.pos))

        editor.view.dispatch(tr)

        editor.view.focus()

        if (history.pushState) {
          history.pushState(null, '', `#${id}`)
        }

        const { node } = editor.view.domAtPos(editor.state.selection.anchor)

        if (node instanceof Element) {
          ;(node as any).scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          })
        }
      }
    }
  }

  return (
    <div className="flex flex-col text-sm text-rotion-100 gap-2 mt-2">
      {items?.map((item) => (
        <ToCLink key={item.id} item={item} onItemClick={onItemClick} />
      ))}
    </div>
  )
})

ToC.displayName = 'ToC'

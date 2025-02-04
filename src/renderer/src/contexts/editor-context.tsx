import { ReactNode, createContext, useState } from 'react'

interface EditorContextProps {
  HTMLContent: string
  setHTMLContent: (content: string) => void
}

export const EditorContext = createContext<EditorContextProps>(
  {} as EditorContextProps,
)

export interface EditorProviderProps {
  children: ReactNode
}

export function EditorProvider(props: EditorProviderProps) {
  const [HTMLContent, setHTMLContent] = useState('')

  return (
    <EditorContext.Provider value={{ HTMLContent, setHTMLContent }}>
      {props.children}
    </EditorContext.Provider>
  )
}

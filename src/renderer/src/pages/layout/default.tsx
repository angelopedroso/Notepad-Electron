import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { EditorProvider } from '../../contexts/editor-context'

export function Default() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <Collapsible.Root
      defaultOpen
      onOpenChange={setIsSidebarOpen}
      className="size-full bg-rotion-900 text-rotion-100 flex"
    >
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-[90vh]">
        <EditorProvider>
          <Header isSidebarOpen={isSidebarOpen} />

          <Outlet />
        </EditorProvider>
      </div>
    </Collapsible.Root>
  )
}

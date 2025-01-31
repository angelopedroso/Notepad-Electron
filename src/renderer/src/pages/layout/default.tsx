import { Outlet } from 'react-router-dom'
import * as Collapsible from '@radix-ui/react-collapsible'

import { useState } from 'react'
import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'

export function Default() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <Collapsible.Root
      defaultOpen
      onOpenChange={setIsSidebarOpen}
      className="size-full bg-rotion-900 text-rotion-100 flex"
    >
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-screen">
        <Header isSidebarOpen={isSidebarOpen} />

        <Outlet />
      </div>
    </Collapsible.Root>
  )
}

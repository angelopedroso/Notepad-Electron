import './styles/global.css'

import { TitleBar } from './components/TitleBar'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { Routes } from '../routes'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col w-screen h-screen">
        <TitleBar />
        <Routes />
      </div>
    </QueryClientProvider>
  )
}

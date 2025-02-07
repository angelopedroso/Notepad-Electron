import './styles/global.css'

import { QueryClientProvider } from '@tanstack/react-query'

import { Routes } from '../routes'
import { TitleBar } from './components/TitleBar'
import { queryClient } from './lib/react-query'

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

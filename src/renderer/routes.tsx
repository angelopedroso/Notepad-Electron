import { MemoryRouter, Route, Routes as RouterRoutes } from 'react-router-dom'

import { Blank } from './src/pages/blank'
import { Document } from './src/pages/document'
import { Default } from './src/pages/layout/default'
import { Trash } from './src/pages/trash'

export function Routes() {
  return (
    <MemoryRouter>
      <RouterRoutes>
        <Route path="/" element={<Default />}>
          <Route path="/" element={<Blank />} />
          <Route path="/documents/:id" element={<Document />} />
          <Route path="/trash" element={<Trash />} />
        </Route>
      </RouterRoutes>
    </MemoryRouter>
  )
}

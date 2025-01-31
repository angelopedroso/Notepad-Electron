import { MemoryRouter, Route, Routes as RouterRoutes } from 'react-router-dom'

import { Blank } from './src/pages/blank'
import { Document } from './src/pages/document'
import { Default } from './src/pages/layout/default'

export function Routes() {
  return (
    <MemoryRouter>
      <RouterRoutes>
        <Route path="/" element={<Default />}>
          <Route path="/" element={<Blank />} />
          <Route path="/documents/:id" element={<Document />} />
        </Route>
      </RouterRoutes>
    </MemoryRouter>
  )
}

import { Document } from './documents'

export type Trash = Document

/**
 * Request
 */

export interface DeleteTrashRequest {
  id: string
}

export interface RestoreDocumentFromTrashRequest {
  id: string
}

/**
 * Response
 */

export interface FetchAllTrashesResponse {
  data: Trash[]
}

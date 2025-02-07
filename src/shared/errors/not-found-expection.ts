export class NotFoundExpection extends Error {
  constructor(entity: string) {
    super(`${entity} não encontrado`)
  }
}

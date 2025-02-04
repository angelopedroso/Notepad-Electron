/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

async function copyMainFolder() {
  const webpackDir = path.resolve(__dirname, '.webpack')
  const sourceMain = path.join(webpackDir, 'x64', 'main')
  const targetMain = path.join(webpackDir, 'main')

  if (!(await fs.pathExists(sourceMain))) {
    console.error(`Pasta de origem não encontrada: ${sourceMain}`)
    process.exit(1)
  }

  await fs.remove(targetMain)

  await fs.copy(sourceMain, targetMain)
  console.log(`Arquivos copiados de ${sourceMain} para ${targetMain}`)
}

copyMainFolder().catch((err) => {
  console.error('Erro ao copiar pasta main:', err)
  process.exit(1)
})

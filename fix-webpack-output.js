/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra')
const path = require('path')

async function fixWebpackOutput() {
  const webpackDir = path.resolve(__dirname, '.webpack')
  const sourceMain = path.join(webpackDir, 'x64', 'main')
  const targetMain = path.join(webpackDir, 'main')

  if (!(await fs.pathExists(sourceMain))) {
    console.error(`Pasta de origem não encontrada: ${sourceMain}`)
    process.exit(1)
  }

  await fs.remove(targetMain)

  await fs.copy(sourceMain, targetMain)
}

fixWebpackOutput().catch((err) => {
  console.error('Erro ao copiar pasta main:', err)
  process.exit(1)
})

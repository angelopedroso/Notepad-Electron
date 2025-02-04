/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra')
const path = require('path')

async function fixWebpackOutput() {
  const webpackDir = path.resolve(__dirname, '.webpack')

  const archFolder = process.arch === 'arm64' ? 'arm64' : 'x64'

  // Se for necessário tratar outros casos (como 'arm' em Linux), você pode adicionar condições:
  // const archFolder = process.arch.startsWith('arm') ? process.arch : 'x64';

  const sourceMain = path.join(webpackDir, archFolder, 'main')
  const targetMain = path.join(webpackDir, 'main')

  if (!(await fs.pathExists(sourceMain))) {
    console.error(`Pasta de origem não encontrada: ${sourceMain}`)
    process.exit(1)
  }

  await fs.remove(targetMain)

  await fs.copy(sourceMain, targetMain)
  console.log(`Arquivos copiados de ${sourceMain} para ${targetMain}`)
}

fixWebpackOutput().catch((err) => {
  console.error('Erro ao copiar pasta main:', err)
  process.exit(1)
})

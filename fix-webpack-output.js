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

  const sourceRenderer = path.join(webpackDir, archFolder, 'renderer')
  const targetRenderer = path.join(webpackDir, 'renderer')

  if (!(await fs.pathExists(sourceMain))) {
    console.error(`Pasta de origem não encontrada: ${sourceMain}`)
    process.exit(1)
  }

  if (!(await fs.pathExists(sourceRenderer))) {
    console.error(`Pasta de origem não encontrada: ${sourceRenderer}`)
    process.exit(1)
  }

  await fs.remove(targetMain)
  await fs.remove(targetRenderer)

  await fs.copy(sourceMain, targetMain)
  await fs.copy(sourceRenderer, targetRenderer)
  console.log(`Arquivos copiados de ${sourceMain} para ${targetMain}`)
}

fixWebpackOutput().catch((err) => {
  console.error('Erro ao copiar pasta main:', err)
  process.exit(1)
})

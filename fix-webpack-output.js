/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

const webpackDir = path.resolve(__dirname, '.webpack')
const sourceDir = path.join(webpackDir, 'x64')
const targetMain = path.join(webpackDir, 'main')
const targetRenderer = path.join(webpackDir, 'renderer')

function createOrReplaceSymlink(source, target) {
  try {
    if (fs.existsSync(target)) {
      fs.rmSync(target, { recursive: true, force: true })
    }
    fs.symlinkSync(source, target, 'junction')
  } catch (error) {
    console.error(`Erro ao criar o link de ${target} para ${source}:`, error)
    process.exit(1)
  }
}

if (!fs.existsSync(sourceDir)) {
  console.error(`Pasta de origem não encontrada: ${sourceDir}`)
  process.exit(1)
}

const sourceMain = path.join(sourceDir, 'main')
if (fs.existsSync(sourceMain)) {
  createOrReplaceSymlink(sourceMain, targetMain)
} else {
  console.error(`Pasta main não encontrada em: ${sourceMain}`)
  process.exit(1)
}

const sourceRenderer = path.join(sourceDir, 'renderer')
if (fs.existsSync(sourceRenderer)) {
  createOrReplaceSymlink(sourceRenderer, targetRenderer)
} else {
  console.warn(`Pasta renderer não encontrada em: ${sourceRenderer}`)
}

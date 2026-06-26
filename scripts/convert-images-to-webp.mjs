import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

const root = process.cwd()
const deleteOriginals = process.argv.includes('--delete-originals')

const includeRoots = ['public/images', 'src/assets']
const ignoredDirs = new Set([
  '.git',
  '.github',
  '.cache',
  'coverage',
  'dist',
  'dist-ssr',
  'node_modules',
])

const rasterExtensions = new Set(['.png', '.jpg', '.jpeg'])
const requiredPngFiles = new Set([
  'public/favicon-16x16.png',
  'public/favicon-32x32.png',
  'public/favicon-192x192.png',
  'public/apple-touch-icon.png',
])

const semanticRenames = new Map([
  [
    'public/images/projects/Screenshot 2026-06-26 215724.png',
    'public/images/projects/saad-logistics/saad-logistics-homepage.webp',
  ],
  [
    'public/images/projects/Screenshot 2026-06-26 215824.png',
    'public/images/projects/saad-logistics/saad-logistics-services.webp',
  ],
])

const stats = {
  converted: [],
  skipped: [],
  deleted: [],
  failed: [],
}

function normalize(relativePath) {
  return relativePath.split(path.sep).join('/')
}

async function exists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function walk(dir) {
  if (!(await exists(dir))) return []

  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (ignoredDirs.has(entry.name)) continue
      files.push(...await walk(path.join(dir, entry.name)))
      continue
    }

    if (entry.isFile()) files.push(path.join(dir, entry.name))
  }

  return files
}

function getOutputPath(inputPath) {
  const relativeInput = normalize(path.relative(root, inputPath))
  const renamed = semanticRenames.get(relativeInput)
  if (renamed) return path.join(root, renamed)

  const parsed = path.parse(inputPath)
  return path.join(parsed.dir, `${parsed.name}.webp`)
}

async function convertImage(inputPath) {
  const relativeInput = normalize(path.relative(root, inputPath))

  if (requiredPngFiles.has(relativeInput)) {
    stats.skipped.push(`${relativeInput} (required browser icon PNG)`)
    return
  }

  const outputPath = getOutputPath(inputPath)
  const relativeOutput = normalize(path.relative(root, outputPath))
  const outputExists = await exists(outputPath)

  if (!outputExists) {
    try {
      const image = sharp(inputPath, { animated: false })
      const metadata = await image.metadata()
      const hasAlpha = Boolean(metadata.hasAlpha)
      const options = hasAlpha
        ? { lossless: true, effort: 6 }
        : { quality: 86, effort: 6 }

      await fs.mkdir(path.dirname(outputPath), { recursive: true })
      await image.webp(options).toFile(outputPath)
      stats.converted.push(`${relativeInput} -> ${relativeOutput}`)
    } catch (error) {
      stats.failed.push(`${relativeInput}: ${error instanceof Error ? error.message : String(error)}`)
      return
    }
  } else {
    stats.skipped.push(`${relativeInput} -> ${relativeOutput} (output exists)`)
  }

  if (deleteOriginals && await exists(outputPath)) {
    try {
      await fs.rm(inputPath)
      stats.deleted.push(relativeInput)
    } catch (error) {
      stats.failed.push(`${relativeInput}: could not delete original: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
}

const candidates = []

for (const relativeRoot of includeRoots) {
  const absoluteRoot = path.join(root, relativeRoot)
  candidates.push(...await walk(absoluteRoot))
}

const uniqueCandidates = [...new Set(candidates)]
  .filter((filePath) => rasterExtensions.has(path.extname(filePath).toLowerCase()))
  .sort((a, b) => normalize(path.relative(root, a)).localeCompare(normalize(path.relative(root, b))))

for (const filePath of uniqueCandidates) {
  await convertImage(filePath)
}

for (const [label, entries] of Object.entries(stats)) {
  console.log(`${label}: ${entries.length}`)
  for (const entry of entries) console.log(`  - ${entry}`)
}

if (stats.failed.length > 0) process.exitCode = 1

import sharp from 'sharp'

export interface OptimizeOptions {
  width?: number
  quality?: number
}

const DEFAULT_WIDTH = 1200
const DEFAULT_QUALITY = 85

export async function optimizeImage(
  buffer: Buffer,
  options: OptimizeOptions = {}
): Promise<Buffer> {
  const width = options.width || DEFAULT_WIDTH
  const quality = options.quality || DEFAULT_QUALITY

  return sharp(buffer)
    .resize(width, undefined, {
      withoutEnlargement: true,
      fit: 'inside',
    })
    .webp({ quality })
    .toBuffer()
}

export function getWebPFilename(originalName: string): string {
  const ext = originalName.replace(/^.*\./, '')
  // If originalName already has an extension, replace it with .webp
  if (ext !== originalName) {
    return originalName.replace(/\.[^.]+$/, '.webp')
  }
  // If no extension, just append .webp
  return `${originalName}.webp`
}

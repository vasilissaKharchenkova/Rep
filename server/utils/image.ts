import { Jimp } from 'jimp'

export async function optimizeImage(
  buffer: Buffer,
  options: { width?: number; quality?: number } = {}
): Promise<Buffer> {
  const width = options.width || 1200
  const quality = options.quality || 85

  const image = await Jimp.read(buffer)
  image.resize({ w: Math.min(width, image.width) })

  return image.getBuffer('image/jpeg', { quality })
}

export function getOptimizedFilename(originalName: string): string {
  const ext = originalName.replace(/^.*\./, '')
  if (ext !== originalName) {
    return originalName.replace(/\.[^.]+$/, '.jpg')
  }
  return `${originalName}.jpg`
}
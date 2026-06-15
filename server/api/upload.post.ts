import { defineEventHandler, createError } from 'h3'
import multer from 'multer'
import path from 'path'
import fs from 'fs/promises'
import { adminGuard } from '../utils/auth'
import { optimizeImage, getOptimizedFilename } from '../utils/image'
import { createCache } from '../utils/cache'

// Import the cache instance to invalidate after upload
// We create a separate cache instance just for invalidation access
const cache = createCache<any>(0)

const uploadDir = process.env.UPLOAD_DIR || 'public/images'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const name = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, name)
  }
})

const upload = multer({ storage })

export default defineEventHandler(async (event) => {
  await adminGuard(event)

  const files = await new Promise<any[]>((resolve, reject) => {
    upload.array('images', 10)(event.node.req as any, event.node.res as any, (err: any) => {
      if (err) return reject(err)
      resolve((event.node.req as any).files || [])
    })
  })

  if (!files || files.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No files uploaded' })
  }

  const urls: string[] = []

  for (const file of files) {
    const buffer = await fs.readFile(file.path)
    const optimizedBuffer = await optimizeImage(buffer, { width: 1200, quality: 85 })

    const optimizedFilename = getOptimizedFilename(file.filename)
    const optimizedPath = path.join(uploadDir, optimizedFilename)

    await fs.writeFile(optimizedPath, optimizedBuffer)

    // Delete the original uploaded file
    await fs.unlink(file.path).catch(() => {})

    urls.push(`/images/${optimizedFilename}`)
  }

  // Invalidate server cache after upload
  cache.invalidatePrefix('products:')
  cache.invalidatePrefix('product:')
  cache.invalidatePrefix('slider:')

  return { urls }
})

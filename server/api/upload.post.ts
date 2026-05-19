import { defineEventHandler, createError } from 'h3'
import multer from 'multer'
import path from 'path'
import { adminGuard } from '../utils/auth'

const uploadDir = process.env.UPLOAD_DIR || 'public/images'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const name = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext
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

  return {
    urls: files.map((f: any) => `/images/${f.filename}`)
  }
})
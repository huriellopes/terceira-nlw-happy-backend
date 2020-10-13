import multer from 'multer'
import crypto from 'crypto'
import path from 'path'
import { Request } from 'express'

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', '..', '..', 'uploads'),
  filename: (req, file, cb) => {
    const fileHash = crypto.randomBytes(10).toString('hex')
    const fileName = `${fileHash}-${file.originalname}`

    return cb(null, fileName)
  },
})

const fileFilter = (req: Request, file: Express.Multer.File, cb) => {
  const isAccepted = ['image/png', 'image/jpg', 'image/jpeg'].find(
    (acceptedFormat) => acceptedFormat == file.mimetype
  )

  if (isAccepted) {
    return cb(null, true)
  }

  return cb(null, false)
}

export default multer({
  storage,
  fileFilter,
})

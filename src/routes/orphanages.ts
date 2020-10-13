import { Router } from 'express'

import uploadMiddleware from '../app/middlewares/upload'
import OrphanagesController from '../app/controllers/OrphanagesController'

const OrphanageRouter = Router()
const orphanagesController = new OrphanagesController()

OrphanageRouter.get('/', orphanagesController.index)
OrphanageRouter.get('/:id', orphanagesController.show)
OrphanageRouter.post(
  '/',
  uploadMiddleware.array('images'),
  orphanagesController.create
)

export default OrphanageRouter

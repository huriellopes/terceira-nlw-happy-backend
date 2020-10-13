import { Router } from 'express'
import OrphanageRouter from './orphanages'

const router = Router()

router.get('/test', (_, res) => {
  res.status(200).json({ message: 'Api is working! Go coding!' })
})

router.use('/orphanages', OrphanageRouter)

export default router

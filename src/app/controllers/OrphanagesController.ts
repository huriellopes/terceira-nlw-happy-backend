import { Request, Response } from 'express'

import orphanageView from '../views/orphanages_view'
import OrphanagesService from '../services/OrphanagesService'

class OrphanagesController {
  /**
   * @param  {Request} _
   * @param  {Response} res
   */
  async index(_: Request, res: Response) {
    const orphanagesService = new OrphanagesService()

    const orphanages = await orphanagesService.index()

    return res.status(200).json(orphanageView.renderMany(orphanages))
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   */
  async create(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body

    const orphanagesService = new OrphanagesService()

    const orphanage = await orphanagesService.create(
      {
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
      },
      req
    )

    return res.status(201).json(orphanage)
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   */
  async show(req: Request, res: Response) {
    const { id } = req.params

    const orphanagesServices = new OrphanagesService()

    const orphanage = await orphanagesServices.show(Number(id))

    return res.status(200).json(orphanageView.render(orphanage))
  }
}

export default OrphanagesController

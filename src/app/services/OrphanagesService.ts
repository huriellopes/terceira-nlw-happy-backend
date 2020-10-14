import { Request } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'
import AppError from '../errors/AppError'

import { IOrphanages } from '../interfaces/IOrphanages'
import Orphanage from '../models/Orphanage'

class OrphanagesService {
  /**
   * @returns Promise
   */
  async index(): Promise<Orphanage[]> {
    const orphanagesRepository = getRepository(Orphanage)

    const orphanages = await orphanagesRepository.find({
      relations: ['images'],
    })

    return orphanages
  }
  /**
   * @param  {IOrphanages}
   * @param  {Request} req
   * @returns Promise
   */
  async create(
    {
      name,
      phone,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    }: IOrphanages,
    req: Request
  ): Promise<Orphanage> {
    const orphanagesRepository = getRepository(Orphanage)

    const requestImages = req.files as Express.Multer.File[]
    const image = requestImages.map((image) => {
      return { path: image.filename }
    })

    const data = {
      name,
      phone,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: String(open_on_weekends) === 'true',
      images: image,
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      phone: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    })

    await schema.validate(data, { abortEarly: false })

    const orphanage = orphanagesRepository.create(data)

    await orphanagesRepository.save(orphanage)

    return orphanage
  }
  /**
   * @param  {number} id
   * @returns Promise
   */
  async show(id: number): Promise<Orphanage> {
    const orphanagesRepository = getRepository(Orphanage)

    const data = {
      id,
    }

    const schema = Yup.object().shape({
      id: Yup.number().required(),
    })

    await schema.validate(data, { abortEarly: false })

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images'],
    })

    if (!Orphanage) {
      throw new AppError('Orphanage not found!')
    }

    return orphanage
  }
}

export default OrphanagesService

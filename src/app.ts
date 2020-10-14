import 'dotenv/config'
import 'reflect-metadata'
import express, { Errback, NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import path from 'path'
import cors from 'cors'
import './database/connection'
import router from './routes'
import AppError from './app/errors/AppError'
import { ValidationError } from 'yup'
import { IValidationErrors } from './app/interfaces/IValidationErrors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

/**
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Page Not Found' })
})

/**
 * @param  {Errback} err
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    const errors: IValidationErrors = {}

    err.inner.forEach((err) => {
      errors[err.path] = err.errors
    })

    return res.status(400).json({ message: 'Validation fails', errors })
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    })
  }

  if (process.env.APP_DEBUG) {
    return res.status(400).json({
      message: err,
    })
  }

  return res.status(500).json({ message: 'Internal Error' })
})

export default app

import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'
import { appRoutes } from './routes'
import { AppError } from '@shared/errors/AppError'
import "@shared/infra/typeorm"
import { errors } from 'celebrate'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', appRoutes)

app.use(errors())
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode
    })
  }

  return res.status(500).json({
    message: 'Internal server error',
    error: err.message,
    statusCode: 500
  })
})

export { app }

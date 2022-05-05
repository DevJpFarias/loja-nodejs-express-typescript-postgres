import 'reflect-metadata'
import 'express-async-errors'
import 'es6-shim'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { routes } from './routes'
import { errors } from 'celebrate'
import { AppError } from '../../errors/AppError'
import { PostgresDataSource } from '../typeorm/connections/index'

import '../../container'
import '../typeorm/connections'

PostgresDataSource.initialize()
	.catch((err) => {
		console.error('Error during Data Source initialization', err)
	})

const app = express()

app.use(cors())

app.use(express.json())

app.use(routes)

app.use(errors())

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
	if(err instanceof AppError) {
		return response.status(err.statusCode).json({
			status: 'error',
			message: err.message,
		})
	}

	console.log(err)

	return response.status(500).json({
		status: 'error',
		message: 'Internal Server Error',
	})
})

export { app }
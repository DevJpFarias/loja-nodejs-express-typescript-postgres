import { NextFunction, Request, Response } from 'express'
import { AppError } from '../../../errors/AppError'
import { verify } from 'jsonwebtoken'
import { UsersRepository } from '../../../../modules/users/infra/typeorm/repositories/UsersRepository'

interface IPayload {
	sub: string
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
	const authHeader = request.headers.authorization

	if(!authHeader) throw new AppError('Token Missing!')

	const [, token] = authHeader.split(' ')

	try {
		const { sub: user_id } = verify(token, '9a995dcc78cda3b260931850c486a6ba') as IPayload
		
		const usersRepository = new UsersRepository()
		const user = await usersRepository.findById(user_id)

		if(!user) throw new AppError('User not exists!')

		request.user = {
			id: user_id
		}

		return next()
	} catch (error) {
		throw new AppError('Invalid Token!')
	}	
}
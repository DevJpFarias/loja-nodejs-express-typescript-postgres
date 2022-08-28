import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { AuthenticateUserService } from '../../../services/AuthenticateUser/AuthenticateUserService'
import { UsersRepository } from '../../typeorm/repositories/UsersRepository'

const usersRepository = new UsersRepository()

export class AuthenticateUserController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { email, password } = request.body

		const authenticateUserService = new AuthenticateUserService(usersRepository)

		const { user, token } = await authenticateUserService.execute({
			email,
			password 
		})

		return response.status(201).json({user: instanceToInstance(user), token})
	}
}
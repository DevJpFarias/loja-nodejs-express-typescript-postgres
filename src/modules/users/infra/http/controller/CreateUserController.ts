import { Request, Response } from 'express'
import { CreateUserService } from '../../../services/CreateUser/CreateUserService'
import { instanceToInstance } from 'class-transformer'
import { UsersRepository } from '../../typeorm/repositories/UsersRepository'

const usersRepository = new UsersRepository()

export class CreateUserController {
	async handle (request: Request, response: Response): Promise<Response> {
		const { name, email, password } = request.body

		const createUserService = new CreateUserService(usersRepository)

		const user = await createUserService.execute({
			name,
			email,
			password
		})

		return response.status(201).json({user: instanceToInstance(user)})
	}
}
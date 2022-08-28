import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'
import { UsersRepository } from '../../typeorm/repositories/UsersRepository'
import { UpdateUserService } from '../../../services/UpdateUser/UpdateUserService'

const usersRepository = new UsersRepository()

export class UpdateUserController {
	async handle (request: Request, response: Response): Promise<Response> {
		const { id } = request.params
		const { name, email, password } = request.body

		const updateUserService = new UpdateUserService(usersRepository)

		const user = await updateUserService.execute({
			id,
			name,
			email,
			password
		})

		return response.status(202).json({user: instanceToInstance(user)})
	}
}
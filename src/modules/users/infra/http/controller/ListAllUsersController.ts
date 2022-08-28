import { Request, Response } from 'express'
import { UsersRepository } from '../../typeorm/repositories/UsersRepository'
import { ListAllUsersService } from '../../../services/ListAllUsers/ListAllUsersService'

const usersRepository = new UsersRepository()

export class ListAllUsersController {
	async handle (request: Request, response: Response): Promise<Response> {
		const listAllUsersService = new ListAllUsersService(usersRepository)

		const users = await listAllUsersService.execute()

		return response.json(users)
	}
}
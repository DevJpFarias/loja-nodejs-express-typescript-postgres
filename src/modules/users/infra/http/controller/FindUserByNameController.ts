import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'
import { UsersRepository } from '../../typeorm/repositories/UsersRepository'
import { FindUsersByNameService } from '../../../services/ListUsersByName/ListUsersByNameService'

const usersRepository = new UsersRepository()

export class FindUserByNameController {
	async handle (request: Request, response: Response): Promise<Response> {
		const { name } = request.body

		const findUsersByNameService = new FindUsersByNameService(usersRepository)

		const users = await findUsersByNameService.execute(name)

		return response.status(202).json({users: instanceToInstance(users)})
	}
}
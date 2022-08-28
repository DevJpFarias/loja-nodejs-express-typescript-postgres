import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { FindUserByIdService } from '../../../services/FindUser/FindUserByIdService'
import { UsersRepository } from '../../typeorm/repositories/UsersRepository'

const usersRepository = new UsersRepository()

export class FindUserByIdController {
	async handle (request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const findUserByIdService = new FindUserByIdService(usersRepository)

		const user = await findUserByIdService.execute(id)

		return response.status(202).json({user: instanceToInstance(user)})
	}
}
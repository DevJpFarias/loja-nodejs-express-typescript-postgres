import { Request, Response } from 'express'
import { DeleteUserService } from '../../../services/DeleteUser/DeleteUserService'
import { UsersRepository } from '../../typeorm/repositories/UsersRepository'

const usersRepository = new UsersRepository()

export class DeleteUserController  {
	async handle (request: Request, response: Response): Promise<Response> {
		const { id } = request.params
  
		const deleteUserService = new DeleteUserService(usersRepository)
  
		await deleteUserService.execute({
			id
		})
  
		return response.status(202).send()
	}
}
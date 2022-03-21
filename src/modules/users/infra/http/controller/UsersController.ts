import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserService } from '../../../services/CreateUserService'
import { DeleteUserService } from '../../../services/DeleteUserService'
import { UpdateUserService } from '../../../services/UpdateUserService'
export class UsersController {
	async create(request: Request, response: Response): Promise<Response> {
		const { name, email, password } = request.body

		const createUserService = container.resolve(CreateUserService)

		const user = await createUserService.execute({
			name,
			email,
			password
		})

		return response.status(201).json(user)
	}

	async update(request: Request, response: Response): Promise<Response> {
		const { id } = request.params
		const { name, email, password } = request.body

		const updateUserService = container.resolve(UpdateUserService)

		const user = await updateUserService.execute({
			id,
			name,
			email,
			password
		})

		return response.status(202).json(user)
	}

	async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const deleteUserService = container.resolve(DeleteUserService)

		await deleteUserService.execute({
			id
		})

		return response.status(202).send()
	}
}
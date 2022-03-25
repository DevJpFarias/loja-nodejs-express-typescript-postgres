import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserService } from '../../../services/CreateUser/CreateUserService'
import { DeleteUserService } from '../../../services/DeleteUser/DeleteUserService'
import { FindUserByIdService } from '../../../services/FindUser/FindUserByIdService'
import { FindUsersByNameService } from '../../../services/ListUsers/ListUsersByNameService'
import { UpdateUserService } from '../../../services/UpdateUser/UpdateUserService'
import { instanceToInstance } from 'class-transformer'

export class UsersController {
	async create(request: Request, response: Response): Promise<Response> {
		const { name, email, password } = request.body

		const createUserService = container.resolve(CreateUserService)

		const user = await createUserService.execute({
			name,
			email,
			password
		})

		return response.status(201).json({user: instanceToInstance(user)})
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

		return response.status(202).json({user: instanceToInstance(user)})
	}

	async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const deleteUserService = container.resolve(DeleteUserService)

		await deleteUserService.execute({
			id
		})

		return response.status(202).send()
	}

	async findById(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const findUserByIdService = container.resolve(FindUserByIdService)

		const user = await findUserByIdService.execute(id)

		return response.status(202).json({user: instanceToInstance(user)})
	}

	async findByName(request: Request, response: Response): Promise<Response> {
		const { name } = request.body

		const findUsersByNameService = container.resolve(FindUsersByNameService)

		const users = await findUsersByNameService.execute(name)

		return response.status(202).json({users: instanceToInstance(users)})
	}
}
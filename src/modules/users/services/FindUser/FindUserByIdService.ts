import { AppError } from '../../../../shared/errors/AppError'
import { User } from '../../infra/typeorm/entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { UsersRepository } from '../../infra/typeorm/repositories/UsersRepository'

export class FindUserByIdService {
	private usersRepository: IUsersRepository

	constructor(repository: IUsersRepository) {
		this.usersRepository = repository

		if(!this.usersRepository) {
			this.usersRepository = new UsersRepository()
		}
	}

	async execute(id: string): Promise<User> {
		const user = await this.usersRepository.findById(id)

		if(!user) throw new AppError('User not found!')

		return user
	}
}
import { User } from '../../infra/typeorm/entities/User'
import { UsersRepository } from '../../infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '../../repositories/IUsersRepository'

export class ListAllUsersService {
	private usersRepository: IUsersRepository

	constructor(repository: IUsersRepository) {
		this.usersRepository = repository

		if(!this.usersRepository) {
			this.usersRepository = new UsersRepository()
		}
	}

	async execute(): Promise<User[]> {
		const users = await this.usersRepository.listAll()

		return users
	}
}
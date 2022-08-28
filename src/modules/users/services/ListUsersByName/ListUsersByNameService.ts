import { User } from '../../infra/typeorm/entities/User'
import { UsersRepository } from '../../infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '../../repositories/IUsersRepository'

export class FindUsersByNameService {
	private usersRepository: IUsersRepository

	constructor(repository: IUsersRepository) {
		this.usersRepository = repository

		if(!this.usersRepository) {
			this.usersRepository = new UsersRepository()
		}
	}

	async execute(name: string): Promise<User[]> {
		const users = await this.usersRepository.findByName(name)

		return users
	}
}
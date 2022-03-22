import { inject, injectable } from 'tsyringe'
import { User } from '../infra/typeorm/entities/User'
import { IUsersRepository } from '../repositories/IUsersRepository'

@injectable()
export class FindUsersByNameService {
	constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
	) {}

	async execute(name: string): Promise<User[]> {
		const users = await this.usersRepository.findByName(name)

		return users
	}
}
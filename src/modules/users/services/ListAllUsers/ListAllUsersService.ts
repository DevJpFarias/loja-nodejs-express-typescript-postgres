import { inject, injectable } from 'tsyringe'
import { User } from '../../infra/typeorm/entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'

@injectable()
export class ListAllUsersService {
	constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
	) {}

	async execute(): Promise<User[]> {
		const users = await this.usersRepository.listAll()

		return users
	}
}
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/errors/AppError'
import { User } from '../../infra/typeorm/entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'

@injectable()
export class FindUserByIdService {
	constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
	) {}

	async execute(id: string): Promise<User> {
		const user = await this.usersRepository.findById(id)

		if(!user) throw new AppError('User not found!')

		return user
	}
}
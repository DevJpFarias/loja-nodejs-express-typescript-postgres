import { AppError } from '../../../../shared/errors/AppError'
import { IDeleteUserDTO } from '../../dtos/IDeleteUserDTO'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { UsersRepository } from '../../infra/typeorm/repositories/UsersRepository'

export class DeleteUserService {
	private usersRepository: IUsersRepository

	constructor(repository: IUsersRepository) {
		this.usersRepository = repository

		if(!this.usersRepository) {
			this.usersRepository = new UsersRepository()
		}
	}

	async execute({ id }: IDeleteUserDTO): Promise<void> {
		const user = await this.usersRepository.findById(id)

		if(!user) throw new AppError('User not found!')

		await this.usersRepository.delete(user)
	}
}
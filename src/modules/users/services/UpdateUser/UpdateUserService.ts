import { AppError } from '../../../../shared/errors/AppError'
import { IUpdateUserDTO } from '../../dtos/IUpdateUserDTO'
import { User } from '../../infra/typeorm/entities/User'
import { UsersRepository } from '../../infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '../../repositories/IUsersRepository'

export class UpdateUserService {
	private usersRepository: IUsersRepository

	constructor(repository: IUsersRepository) {
		this.usersRepository = repository

		if(!this.usersRepository) {
			this.usersRepository = new UsersRepository()
		}
	}

	async execute({
		id,
		name,
		email,
		password
	}: IUpdateUserDTO): Promise<User> {
		const user = await this.usersRepository.findById(id)

		if(!user) throw new AppError('User not found!')

		const emailAlreadyExist = await this.usersRepository.findByEmail(email)

		if(email != user.email && emailAlreadyExist) throw new AppError('This email already exists!')
		
		user.name = name
		user.email = email
		user.password = password

		await this.usersRepository.update(user)

		return user
	}
}
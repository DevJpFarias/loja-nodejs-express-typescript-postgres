import { User } from '../../infra/typeorm/entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { AppError } from '../../../../shared/errors/AppError'
import { hash } from 'bcrypt'
import { UsersRepository } from '../../infra/typeorm/repositories/UsersRepository'

export class CreateUserService {
	private usersRepository: IUsersRepository

	constructor(repository: IUsersRepository) {
		this.usersRepository = repository

		if(!this.usersRepository) {
			this.usersRepository = new UsersRepository()
		}
	}

	async execute({
		name,
		email,
		password
	}: ICreateUserDTO): Promise<User> {
		const verifyEmail = await this.usersRepository.findByEmail(email)

		if(verifyEmail) throw new AppError('Email already exists!')

		const passwordHash = await hash(password, 8)

		const user = await this.usersRepository.create({
			name,
			email,
			password: passwordHash
		})

		return user
	}
}
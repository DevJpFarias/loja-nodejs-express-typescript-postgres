import { inject, injectable } from 'tsyringe'
import { User } from '../infra/typeorm/entities/User'
import { IUsersRepository } from '../repositories/IUsersRepository'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { AppError } from '../../../shared/errors/AppError'

@injectable()
export class CreateUserService {
	constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
	) {}

	async execute({
		name,
		email,
		password
	}: ICreateUserDTO): Promise<User> {
		const verifyEmail = await this.usersRepository.findByEmail(email)

		if(verifyEmail) throw new AppError('Email already exists!')

		const user = await this.usersRepository.create({
			name,
			email,
			password
		})

		return user
	}
}
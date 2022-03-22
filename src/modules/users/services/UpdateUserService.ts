import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../shared/errors/AppError'
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO'
import { User } from '../infra/typeorm/entities/User'
import { IUsersRepository } from '../repositories/IUsersRepository'

@injectable()
export class UpdateUserService {
	constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
	) {}

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
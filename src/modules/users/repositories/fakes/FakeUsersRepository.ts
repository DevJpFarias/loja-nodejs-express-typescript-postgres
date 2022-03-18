import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { User } from '../../infra/typeorm/entities/User'
import { IUsersRepository } from '../IUsersRepository'

export class FakeUsersRepository implements IUsersRepository {
	private usersRepository: User[] = []

	async create({
		name,
		email,
		password
	}: ICreateUserDTO): Promise<User> {
		const user = new User()

		Object.assign(user, {
			name,
			email,
			password
		})

		this.usersRepository.push(user)

		return user
	}
	async findByEmail(email: string): Promise<User> {
		const verifyEmail = this.usersRepository.find(user => user.email === email)

		return verifyEmail
	}

}
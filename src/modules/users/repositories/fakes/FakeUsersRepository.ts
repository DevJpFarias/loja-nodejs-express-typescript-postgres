import { IDeleteProductDTO } from '../../../products/dtos/IDeleteProductDTO'
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
		const user = this.usersRepository.find(user => user.email === email)

		return user
	}

	async findById(id: string): Promise<User> {
		const user = this.usersRepository.find(user => user.id === id)

		return user
	}

	async delete({ id }: IDeleteProductDTO): Promise<void> {
		const user = this.usersRepository.find(user => user.id === id)

		const findIndex = this.usersRepository.indexOf(user)

		this.usersRepository.splice(findIndex, 1)
	}

}
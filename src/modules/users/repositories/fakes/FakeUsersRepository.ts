import { IDeleteProductDTO } from '../../../products/dtos/IDeleteProductDTO'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { User } from '../../infra/typeorm/entities/User'
import { IUsersRepository } from '../IUsersRepository'
import { v4 as uuid } from 'uuid'

export class FakeUsersRepository implements IUsersRepository {
	private usersRepository: User[] = []

	async create({
		name,
		email,
		password
	}: ICreateUserDTO): Promise<User> {
		const user = new User()

		Object.assign(user, {
			id: uuid(),
			name,
			email,
			password,
			isAdmin: false,
			created_at: new Date(),
			updated_at: new Date()
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

	async findByName(name: string): Promise<User[]> {
		const users = this.usersRepository.filter(user => user.name === name)

		return users
	}

	async listAll(): Promise<User[]> {
		const users = this.usersRepository.map(users => users)

		return users
	}

	async update(user: User): Promise<User> {
		const findIndexUser = this.usersRepository.findIndex(update_user => update_user.id === user.id)

		this.usersRepository[findIndexUser] = user

		return user
	}

	async delete({ id }: IDeleteProductDTO): Promise<void> {
		const user = this.usersRepository.find(user => user.id === id)

		const findIndex = this.usersRepository.indexOf(user)

		this.usersRepository.splice(findIndex, 1)
	}

}
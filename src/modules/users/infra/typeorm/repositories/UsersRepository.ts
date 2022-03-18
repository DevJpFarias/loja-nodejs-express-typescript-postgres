import { getRepository, Repository } from 'typeorm'
import { ICreateProductDTO } from '../../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { User } from '../entities/User'

export class UsersRepository implements IUsersRepository {
	private ormRepository: Repository<User>

	constructor() {
		this.ormRepository = getRepository(User)
	}

	async create({
		name,
		email,
		password
	}: ICreateProductDTO): Promise<User> {
		const user = this.ormRepository.create({
			name,
			email,
			password
		})

		await this.ormRepository.save(user)

		return user
	}

}
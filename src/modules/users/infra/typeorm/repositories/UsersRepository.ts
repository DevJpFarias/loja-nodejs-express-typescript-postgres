import { Repository } from 'typeorm'
import { PostgresDataSource } from '../../../../../shared/infra/typeorm/index'
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { User } from '../entities/User'

export class UsersRepository implements IUsersRepository {
	private ormRepository: Repository<User>

	constructor() {
		this.ormRepository = PostgresDataSource.getRepository(User)
	}

	async create({
		name,
		email,
		password
	}: ICreateUserDTO): Promise<User> {
		const user = this.ormRepository.create({
			name,
			email,
			password
		})

		await this.ormRepository.save(user)

		return user
	}

	async findByEmail(email: string): Promise<User> {
		const user = this.ormRepository.findOne({
			where: {
				email: email
			}
		})

		return user
	}

	async findById(id: string): Promise<User> {
		const user = this.ormRepository.findOne({
			where: {
				id: id
			}
		})

		return user
	}

	async findByName(name: string): Promise<User[]> {
		const users = this.ormRepository.findBy({
			name: name
		})

		return users
	}

	async listAll(): Promise<User[]> {
		const users = this.ormRepository.find()

		return users
	}

	async update(user: User): Promise<User> {
		await this.ormRepository.save(user)
		
		return user
	}

	async delete(user: User): Promise<void> {
		await this.ormRepository.remove(user)
	}
}
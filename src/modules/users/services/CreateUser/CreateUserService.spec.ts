import { AppError } from '../../../../shared/errors/AppError'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { FakeUsersRepository } from '../../repositories/fakes/FakeUsersRepository'
import { CreateUserService } from './CreateUserService'

let fakeUsersRepository: FakeUsersRepository
let createUserService: CreateUserService

describe('User creation', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository()
		createUserService = new CreateUserService(fakeUsersRepository)
	})

	it('Should be able to create a new user', async () => {
		const spyCreate = jest.spyOn(fakeUsersRepository, 'create')

		const data: ICreateUserDTO = {
			name: 'João Paulo',
			email: 'joaopaulo@gmail.com',
			password: '1234'
		}

		const user = await createUserService.execute(data)

		expect(spyCreate).toBeCalledTimes(1)
		expect(user).toHaveProperty('id')
	})

	it('Should not be able to create a new user with an existent email', async () => {
		const data: ICreateUserDTO = {
			name: 'João Paulo',
			email: 'joaopaulo@gmail.com',
			password: '1234'
		}

		await createUserService.execute(data)

		await expect(createUserService.execute({
			name: 'Paulinho',
			email: 'joaopaulo@gmail.com',
			password: '1234'
		})
		).rejects.toEqual(new AppError('Email already exists!', 400))
	})
})
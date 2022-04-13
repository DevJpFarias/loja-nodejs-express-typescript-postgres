import { AppError } from '../../../../shared/errors/AppError'
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

		const user = await createUserService.execute({
			name: 'João Paulo',
			email: 'joaopaulo@gmail.com',
			password: '1234'
		})

		expect(spyCreate).toBeCalledWith(user)
		expect(spyCreate).toBeCalledTimes(1)
	})

	it('Should not be able to create a new user with an existent email', async () => {
		expect(async () => {
			await createUserService.execute({
				name: 'João Paulo',
				email: 'joaopaulo@gmail.com',
				password: '1234'
			})

			await createUserService.execute({
				name: 'Paulinho',
				email: 'joaopaulo@gmail.com',
				password: '1234'
			})
		}).rejects.toBeInstanceOf(AppError)
	})
})
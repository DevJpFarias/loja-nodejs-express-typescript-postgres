import { AppError } from '../../../../shared/errors/AppError'
import { FakeUsersRepository } from '../../repositories/fakes/FakeUsersRepository'
import { CreateUserService } from '../CreateUser/CreateUserService'
import { AuthenticateUserService } from './AuthenticateUserService'

let fakeUsersRepository: FakeUsersRepository
let createUserService: CreateUserService
let authenticateUserService: AuthenticateUserService

describe('User authentication', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository()
		createUserService = new CreateUserService(fakeUsersRepository)
		authenticateUserService = new AuthenticateUserService(fakeUsersRepository)
	})

	it('Should not be able to authenticate an nonexistent user', () => {
		expect(async () => {
			await authenticateUserService.execute({
				email: 'joaopaulo@gmail.com',
				password: '1234'
			})
		}).rejects.toBeInstanceOf(AppError)
	})

	it('Should not be able to do login with an wrong password', () => {
		expect(async () => {
			const user = await createUserService.execute({
				name: 'João Paulo',
				email: 'joaopaulo@gmail.com',
				password: '1234'
			})

			await authenticateUserService.execute({
				email: user.email,
				password: '4321'
			})
		}).rejects.toBeInstanceOf(AppError)
	})
})
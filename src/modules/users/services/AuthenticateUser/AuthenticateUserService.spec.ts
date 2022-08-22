import { AppError } from '../../../../shared/errors/AppError'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
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

	it('Should not be able to authenticate an nonexistent user', async () => {
		await expect(authenticateUserService.execute({
			email: 'joaopaulo@gmail.com',
			password: '1234'
		})
		).rejects.toEqual(new AppError('Incorrect email or password'))
	})

	it('Should not be able to do login with an wrong password', async () => {
		const data: ICreateUserDTO = {
			name: 'João Paulo',
			email: 'joaopaulo@gmail.com',
			password: '1234'
		}

		const user = await createUserService.execute(data)

		await expect(authenticateUserService.execute({
			email: user.email,
			password: '4321'
		})).rejects.toEqual(new AppError('Incorrect email or password'))
	})
})
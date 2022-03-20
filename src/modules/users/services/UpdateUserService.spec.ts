import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository'
import { CreateUserService } from './CreateUserService'
import { UpdateUserService } from './UpdateUserService'

let fakeUsersRepository: FakeUsersRepository
let createUserService: CreateUserService
let updateUserService: UpdateUserService

describe('User update', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository()
		createUserService = new CreateUserService(fakeUsersRepository)
		updateUserService = new UpdateUserService(fakeUsersRepository)
	})

	it('Should be able to update an user', async () => {
		const user = await createUserService.execute({
			name: 'João Paulo',
			email: 'joaopaulo@gmail.com',
			password: '1234'
		})

		const update_user = await updateUserService.execute({
			id: user.id,
			name: 'Paulinho',
			email: 'joaopaulo@gmail.com',
			password: '1234'
		})

		expect(user.id).toBe(update_user.id)
		expect(user.name).toBe(update_user.name)
		expect(user.email).toBe(update_user.email)
		expect(user.password).toBe(update_user.password)
	})
})
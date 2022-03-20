import { AppError } from '../../../shared/errors/AppError'
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

	it('Should not be able to update an nonexistent user', () => {
		expect(async () => {
			await updateUserService.execute({
				id: '1234',
				name: 'Paulinho',
				email: 'joaopaulo@gmail.com',
				password: '1234'
			})
		}).rejects.toBeInstanceOf(AppError)
	})

	it('Should not be able to update an user with an existent email', () => {
		expect(async () => {
			const user = await createUserService.execute({
				name: 'João Paulo',
				email: 'joaopaulo@gmail.com',
				password: '1234'
			})

			await createUserService.execute({
				name: 'Isabela',
				email: 'isaisa@gmail.com',
				password: 'isabela'
			})

			await updateUserService.execute({
				id: user.id,
				name: 'Paulinho',
				email: 'isaisa@gmail.com',
				password: '1234'
			})
		}).rejects.toBeInstanceOf(AppError)
	})
})
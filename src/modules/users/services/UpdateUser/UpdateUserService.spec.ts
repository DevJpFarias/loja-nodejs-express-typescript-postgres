import { AppError } from '../../../../shared/errors/AppError'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '../../dtos/IUpdateUserDTO'
import { FakeUsersRepository } from '../../repositories/fakes/FakeUsersRepository'
import { CreateUserService } from '../CreateUser/CreateUserService'
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
		const data: ICreateUserDTO = {
			name: 'João Paulo',
			email: 'joaopaulo@gmail.com',
			password: '1234'
		}

		const user = await createUserService.execute(data)

		const spyUpdate = jest.spyOn(fakeUsersRepository, 'update')

		const update_data: IUpdateUserDTO = {
			id: user.id,
			name: 'Paulinho',
			email: 'joaopaulo@gmail.com',
			password: '1234'
		}

		const update_user = await updateUserService.execute(update_data)
		
		expect(spyUpdate).toBeCalledWith(user)
		expect(spyUpdate).toBeCalledTimes(1)
		expect(user.id).toBe(update_user.id)
		expect(user.name).toBe(update_user.name)
		expect(user.email).toBe(update_user.email)
		expect(user.password).toBe(update_user.password)
	})

	it('Should not be able to update an nonexistent user', async () => {
		await expect(updateUserService.execute({
			id: '1234',
			name: 'Paulinho',
			email: 'joaopaulo@gmail.com',
			password: '1234'
		})
		).rejects.toEqual(new AppError('User not found!'))
	})

	it('Should not be able to update an user with an existent email', async () => {
		const data: ICreateUserDTO = {
			name: 'João Paulo',
			email: 'joaopaulo@gmail.com',
			password: '1234'
		}

		const user = await createUserService.execute(data)

		await createUserService.execute({
			name: 'Isabela',
			email: 'isaisa@gmail.com',
			password: 'isabela'
		})

		await expect(updateUserService.execute({
			id: user.id,
			name: 'Paulinho',
			email: 'isaisa@gmail.com',
			password: '1234'
		})).rejects.toEqual(new AppError('This email already exists!', 400))
	})
})
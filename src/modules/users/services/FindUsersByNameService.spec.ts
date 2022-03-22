import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository'
import { CreateUserService } from './CreateUserService'
import { FindUsersByNameService } from './FindUsersByNameService'

let fakeUsersRepository: FakeUsersRepository
let createUserService: CreateUserService
let findUsersByNameService: FindUsersByNameService

describe('Find Users by Name', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository()
		createUserService = new CreateUserService(fakeUsersRepository)
		findUsersByNameService = new FindUsersByNameService(fakeUsersRepository)
	})

	it('Should be able to find users by name', async () => {
		const user1 = await createUserService.execute({
			name: 'João Paulo',
			email: 'joaopaulo@gmail.com',
			password: '1234'
		})

		const user2 = await createUserService.execute({
			name: 'João Paulo',
			email: 'paulinho@gmail.com',
			password: '4321'
		})

		await createUserService.execute({
			name: 'Paulinho',
			email: 'jp@gmail.com',
			password: '1231'
		})

		const spyFindByName = jest.spyOn(fakeUsersRepository, 'findByName')

		const users = await findUsersByNameService.execute('João Paulo')

		expect(spyFindByName).toBeCalledWith(user1.name)
		expect(spyFindByName).toBeCalledTimes(1)
		expect(users).toStrictEqual([user1, user2])
	})
})
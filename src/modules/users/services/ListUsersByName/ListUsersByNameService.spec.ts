import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { FakeUsersRepository } from '../../repositories/fakes/FakeUsersRepository'
import { CreateUserService } from '../CreateUser/CreateUserService'
import { FindUsersByNameService } from './ListUsersByNameService'

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
		const data: ICreateUserDTO = {
			name: 'João Paulo',
			email: 'joaopaulo@gmail.com',
			password: '1234'
		}

		const data2: ICreateUserDTO = {
			name: 'João Paulo',
			email: 'paulinho@gmail.com',
			password: '4321'
		}

		const data3: ICreateUserDTO = {
			name: 'Paulinho',
			email: 'jp@gmail.com',
			password: '1231'
		}

		const user1 = await createUserService.execute(data)

		const user2 = await createUserService.execute(data2)

		await createUserService.execute(data3)

		const spyFindByName = jest.spyOn(fakeUsersRepository, 'findByName')

		const users = await findUsersByNameService.execute('João Paulo')

		expect(spyFindByName).toBeCalledWith(user1.name)
		expect(spyFindByName).toBeCalledTimes(1)
		expect(users).toStrictEqual([user1, user2])
	})
})
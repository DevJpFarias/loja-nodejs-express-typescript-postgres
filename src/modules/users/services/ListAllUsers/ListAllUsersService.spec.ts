import { FakeUsersRepository } from '../../repositories/fakes/FakeUsersRepository'
import { ListAllUsersService } from './ListAllUsersService'

let fakeUsersRepository: FakeUsersRepository
let listAllUsersService: ListAllUsersService

describe('List All Users Service', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository()
		listAllUsersService = new ListAllUsersService(fakeUsersRepository)
	})

	it('Should be able to list all users', async () => {
		const spyListAllUsers = jest.spyOn(fakeUsersRepository, 'listAll')

		const products = await listAllUsersService.execute()

		expect(spyListAllUsers).toBeCalledTimes(1)
		expect(products).toEqual([])
	})
})
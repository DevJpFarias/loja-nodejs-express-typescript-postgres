import { AppError } from '../../../../shared/errors/AppError'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { FakeUsersRepository } from '../../repositories/fakes/FakeUsersRepository'
import { CreateUserService } from '../CreateUser/CreateUserService'
import { FindUserByIdService } from './FindUserByIdService'

let fakeUsersRepository: FakeUsersRepository
let createUserService: CreateUserService
let findUserByIdService: FindUserByIdService

describe('Find User by Id', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository()
		createUserService = new CreateUserService(fakeUsersRepository)
		findUserByIdService = new FindUserByIdService(fakeUsersRepository)
	})

	it('Should be able to find one user with her id', async () => {
		const data: ICreateUserDTO = {
			name: 'João Paulo',
			email: 'joaopaulo@gmail.com',
			password: '1234'
		}

		const user = await createUserService.execute(data)

		const spyFindById = jest.spyOn(fakeUsersRepository, 'findById')

		const findUser = await findUserByIdService.execute(user.id)
    
		expect(spyFindById).toBeCalledWith(user.id)
		expect(spyFindById).toBeCalledTimes(1)
		expect(findUser).toEqual(user)
	})

	it('Should not be able to find an nonexistent user', async () => {
		await expect(findUserByIdService.execute('1234')
		).rejects.toEqual(new AppError('User not found!'))
	})
})
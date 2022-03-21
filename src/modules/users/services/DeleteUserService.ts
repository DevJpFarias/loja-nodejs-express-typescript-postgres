import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../shared/errors/AppError'
import { IDeleteUserDTO } from '../dtos/IDeleteUserDTO'
import { IUsersRepository } from '../repositories/IUsersRepository'

@injectable()
export class DeleteUserService {
	constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
	) {}

	async execute({ id }: IDeleteUserDTO): Promise<void> {
		const user = await this.usersRepository.findById(id)

		if(!user) throw new AppError('User not found!')

		await this.usersRepository.delete(user)
	}
}
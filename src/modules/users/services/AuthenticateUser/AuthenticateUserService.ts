import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/errors/AppError'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { User } from '../../infra/typeorm/entities/User'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User,
  token: string
}

@injectable()
export class AuthenticateUserService {
	constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
	) {}

	async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(email)

		if(!user) throw new AppError('Incorrect email or password')

		const passwordCompare = await compare(password, user.password)

		if(!passwordCompare) throw new AppError('Incorrect email or password')

		const token = sign({}, '9a995dcc78cda3b260931850c486a6ba', {
			subject: user.id,
			expiresIn: '1d'
		})

		return {
			user,
			token
		}
	}
}
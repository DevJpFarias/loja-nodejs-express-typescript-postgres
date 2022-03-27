import { instanceToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthenticateUserService } from '../../../services/AuthenticateUser/AuthenticateUserService'

export class AuthenticateUsersController {
	async authentication(request: Request, response: Response): Promise<Response> {
		const { email, password } = request.body

		const authenticateUserService = container.resolve(AuthenticateUserService)

		const { user, token } = await authenticateUserService.execute({
			email,
			password 
		})

		return response.status(201).json({user: instanceToInstance(user), token})
	}
}
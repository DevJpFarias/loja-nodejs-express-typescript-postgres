import { Router } from 'express'
import { AuthenticateUserController } from '../controller/AuthenticateUsersController'

const authenticateRouter = Router()

const authenticateUserController = new AuthenticateUserController()

authenticateRouter.post('/session', authenticateUserController.handle)

export { authenticateRouter }
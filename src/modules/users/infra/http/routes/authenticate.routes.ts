import { Router } from 'express'
import { AuthenticateUsersController } from '../controller/AuthenticateUsersController'

const authenticateRouter = Router()

const authenticateUsersController = new AuthenticateUsersController()

authenticateRouter.post('/session', authenticateUsersController.authentication)

export { authenticateRouter }
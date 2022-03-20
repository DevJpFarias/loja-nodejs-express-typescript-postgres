import { Router } from 'express'
import { UsersController } from '../controller/UsersController'


const usersRouter = Router()

const usersController = new UsersController()

usersRouter.post('/', usersController.create)
usersRouter.put('/:id', usersController.update)

export { usersRouter }
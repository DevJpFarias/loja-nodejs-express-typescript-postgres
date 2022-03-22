import { Router } from 'express'
import { UsersController } from '../controller/UsersController'


const usersRouter = Router()

const usersController = new UsersController()

usersRouter.post('/', usersController.create)
usersRouter.put('/update/:id', usersController.update)
usersRouter.delete('/delete/:id', usersController.delete)
usersRouter.get('/findById/:id', usersController.findById)
usersRouter.get('/findByName', usersController.findByName)

export { usersRouter }
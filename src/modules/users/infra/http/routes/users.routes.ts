import { Router } from 'express'
import { ensureAuthenticated } from '../../../../../shared/infra/http/middlewares/ensureAuthenticated'
import { UsersController } from '../controller/UsersController'


const usersRouter = Router()

const usersController = new UsersController()

usersRouter.post('/', usersController.create)
usersRouter.put('/update/:id', ensureAuthenticated, usersController.update)
usersRouter.delete('/delete/:id', ensureAuthenticated, usersController.delete)
usersRouter.get('/findById/:id', usersController.findById)
usersRouter.get('/findByName', usersController.findByName)

export { usersRouter }
import { Router } from 'express'
import { ensureAdmin } from '../../../../../shared/infra/http/middlewares/ensureAdmin'
import { ensureAuthenticated } from '../../../../../shared/infra/http/middlewares/ensureAuthenticated'
import { UsersController } from '../controller/UsersController'


const usersRouter = Router()

const usersController = new UsersController()

usersRouter.post('/', usersController.create)
usersRouter.put('/update/:id', ensureAuthenticated, usersController.update)
usersRouter.delete('/delete/:id', ensureAuthenticated, usersController.delete)
usersRouter.get('/findById/:id', ensureAuthenticated, ensureAdmin, usersController.findById)
usersRouter.get('/findByName', ensureAuthenticated, ensureAdmin, usersController.findByName)

export { usersRouter }
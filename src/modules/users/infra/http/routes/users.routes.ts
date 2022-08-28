import { Router } from 'express'
import { ensureAdmin } from '../../../../../shared/infra/http/middlewares/ensureAdmin'
import { ensureAuthenticated } from '../../../../../shared/infra/http/middlewares/ensureAuthenticated'
import { CreateUserController } from '../controller/CreateUserController'
import { DeleteUserController } from '../controller/DeleteUserController'
import { FindUserByIdController } from '../controller/FindUserByIdController'
import { FindUserByNameController } from '../controller/FindUserByNameController'
import { ListAllUsersController } from '../controller/ListAllUsersController'
import { UpdateUserController } from '../controller/UpdateUserController'

const usersRouter = Router()

const createUserController = new CreateUserController()
const updateUserController = new UpdateUserController()
const deleteUserController = new DeleteUserController()
const findUserByIdController = new FindUserByIdController()
const findUserByNameController = new FindUserByNameController()
const listAllUsersController = new ListAllUsersController()

usersRouter.post('/', createUserController.handle)
usersRouter.put('/update/:id', ensureAuthenticated, updateUserController.handle)
usersRouter.delete('/delete/:id', ensureAuthenticated, deleteUserController.handle)
usersRouter.get('/findById/:id', ensureAuthenticated, ensureAdmin, findUserByIdController.handle)
usersRouter.get('/findByName', ensureAuthenticated, ensureAdmin, findUserByNameController.handle)
usersRouter.get('/', listAllUsersController.handle)

export { usersRouter }
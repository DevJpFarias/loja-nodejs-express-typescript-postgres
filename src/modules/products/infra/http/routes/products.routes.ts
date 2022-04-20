import { Router } from 'express'
import { ensureAdmin } from '../../../../../shared/infra/http/middlewares/ensureAdmin'
import { ensureAuthenticated } from '../../../../../shared/infra/http/middlewares/ensureAuthenticated'
import { ProductsController } from '../controllers/ProductsController'

const productsRouter = Router()

const productsController = new ProductsController()

productsRouter.post('/', ensureAuthenticated, ensureAdmin, productsController.create)
productsRouter.get('/listByName/', productsController.listByName)
productsRouter.get('/', productsController.listAll)
productsRouter.put('/:id', ensureAuthenticated, ensureAdmin, productsController.update)
productsRouter.delete('/delete/:id', ensureAuthenticated, ensureAdmin, productsController.delete)

export { productsRouter }
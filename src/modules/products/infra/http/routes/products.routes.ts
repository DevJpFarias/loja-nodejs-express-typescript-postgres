import { Router } from 'express'
import { ProductsController } from '../controllers/ProductsController'

const productsRouter = Router()

const productsController = new ProductsController()

productsRouter.post('/', productsController.create)
productsRouter.get('/', productsController.listByName)

export { productsRouter }
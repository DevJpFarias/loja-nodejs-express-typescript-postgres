import { Router } from 'express'
import { ensureAdmin } from '../../../../../shared/infra/http/middlewares/ensureAdmin'
import { ensureAuthenticated } from '../../../../../shared/infra/http/middlewares/ensureAuthenticated'
import { CreateProductController } from '../controllers/CreateProduct/CreateProductController'
import { DeleteProductController } from '../controllers/DeleteProduct/DeleteProductController'
import { ListAllProductsController } from '../controllers/ListAllProducts/ListAllProductsController'
import { ListProductsByNameController } from '../controllers/ListProductsByName/ListProductsByNameController'
import { UpdateProductController } from '../controllers/UpdateProduct/UpdateProductController'

const productsRouter = Router()

const createProductController = new CreateProductController()
const listProductsByNameController = new ListProductsByNameController()
const listAllProductsController = new ListAllProductsController() 
const updateProductController = new UpdateProductController()
const deleteProductController = new DeleteProductController()

productsRouter.post('/', ensureAuthenticated, ensureAdmin, createProductController.handle)
productsRouter.get('/listByName', listProductsByNameController.handle)
productsRouter.get('/', listAllProductsController.handle)
productsRouter.put('/:id', ensureAuthenticated, ensureAdmin, updateProductController.handle)
productsRouter.delete('/delete/:id', ensureAuthenticated, ensureAdmin, deleteProductController.handle)

export { productsRouter }
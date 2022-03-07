import { Router } from 'express'

import { productsRouter } from '../../../../modules/products/infra/http/routes/products.routes'

const routes = Router()

routes.use('/products', productsRouter)

export { routes }
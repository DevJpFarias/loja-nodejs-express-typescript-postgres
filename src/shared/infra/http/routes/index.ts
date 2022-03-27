import { Router } from 'express'

import { productsRouter } from '../../../../modules/products/infra/http/routes/products.routes'
import { authenticateRouter } from '../../../../modules/users/infra/http/routes/authenticate.routes'
import { usersRouter } from '../../../../modules/users/infra/http/routes/users.routes'

const routes = Router()

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use(authenticateRouter)

export { routes }
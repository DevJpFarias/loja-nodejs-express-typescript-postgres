import { Router } from 'express'

const routes = Router()

routes.get('/products', (request, response) => {
	return response.send({message: 'Connect with success'})
})

export { routes }
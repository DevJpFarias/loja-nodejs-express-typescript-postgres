import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateProductsService } from '../../../services/CreateProductsService'
import { ListProductsService } from '../../../services/ListProductsService'


export class ProductsController {
	async create(request: Request, response: Response): Promise<Response> {
		const { name, description, price } = request.body

		const createProducts = container.resolve(CreateProductsService)

		const product = await createProducts.execute({
			name,
			description,
			price
		})

		return response.status(201).json(product)
	}

	async listByName(request: Request, response: Response): Promise<Response> {
		const { name } = request.body

		const listProducts = container.resolve(ListProductsService)

		const products = await listProducts.execute(name)

		return response.json(products)
	}
}
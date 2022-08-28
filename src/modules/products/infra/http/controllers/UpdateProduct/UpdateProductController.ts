import { Request, Response } from 'express'
import { UpdateProductService } from '../ProductsControllerHelpers'
import { ProductsRepository } from '../../../typeorm/repositories/ProductsRepository'

const productsRepository = new ProductsRepository()

export class UpdateProductController {
	async handle (request: Request, response: Response): Promise<Response> {
		const { id } = request.params
		const { name, description, price } = request.body

		const updateProductService = new UpdateProductService(productsRepository)

		const product = await updateProductService.execute({
			id,
			name,
			description,
			price
		})

		return response.json(product)
	}
}
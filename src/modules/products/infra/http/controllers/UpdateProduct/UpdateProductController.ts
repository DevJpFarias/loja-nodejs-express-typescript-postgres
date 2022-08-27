import 'reflect-metadata'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateProductService } from '../ProductsControllerHelpers'

export class UpdateProductController {
	async handle (request: Request, response: Response): Promise<Response> {
		const { id } = request.params
		const { name, description, price } = request.body

		const updateProductService = container.resolve(UpdateProductService)

		const product = await updateProductService.execute({
			id,
			name,
			description,
			price
		})

		return response.json(product)
	}
}
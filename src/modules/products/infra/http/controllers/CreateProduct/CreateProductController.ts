import 'reflect-metadata'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateProductsService } from '../ProductsControllerHelpers'

export class CreateProductController {
	async handle (request: Request, response: Response): Promise<Response> {
		const { name, description, price, brand, expiration_date } = request.body
	
		const createProductsService = container.resolve(CreateProductsService)
	
		const product = await createProductsService.execute({
			name,
			description,
			price,
			brand,
			expiration_date
		})
	
		return response.status(201).json(product)
	}
}
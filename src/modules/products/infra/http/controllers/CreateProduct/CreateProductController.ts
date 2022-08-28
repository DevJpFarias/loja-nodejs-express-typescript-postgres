import 'reflect-metadata'
import { Request, Response } from 'express'
import { CreateProductsService } from '../ProductsControllerHelpers'
import { ProductsRepository } from '../../../typeorm/repositories/ProductsRepository'

const productsRepository = new ProductsRepository()

export class CreateProductController {
	async handle (request: Request, response: Response): Promise<Response> {
		const { name, description, price, brand, expiration_date } = request.body
	
		const createProductsService = new CreateProductsService(productsRepository)
	
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
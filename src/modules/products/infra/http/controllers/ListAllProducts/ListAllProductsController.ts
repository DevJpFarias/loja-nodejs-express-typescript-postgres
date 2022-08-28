import 'reflect-metadata'
import 'reflect-metadata'
import { Request, Response } from 'express'
import { ListAllProductsService } from '../ProductsControllerHelpers'
import { ProductsRepository } from '../../../typeorm/repositories/ProductsRepository'

const productsRepository = new ProductsRepository()

export class ListAllProductsController {
	async handle (request: Request, response: Response): Promise<Response> {
		const listAllProductsService = new ListAllProductsService(productsRepository)

		const products = await listAllProductsService.execute()

		return response.json(products)
	}
}

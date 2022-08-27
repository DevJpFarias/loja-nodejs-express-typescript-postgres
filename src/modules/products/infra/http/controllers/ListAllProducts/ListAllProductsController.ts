import 'reflect-metadata'
import 'reflect-metadata'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAllProductsService } from '../ProductsControllerHelpers'


export class ListAllProductsController {
	async handle (request: Request, response: Response): Promise<Response> {
		const listAllProductsService = container.resolve(ListAllProductsService)

		const products = await listAllProductsService.execute()

		return response.json(products)
	}
}

import { Request, Response } from 'express'
import { ListProductsByNameService } from '../ProductsControllerHelpers'
import { ProductsRepository } from '../../../typeorm/repositories/ProductsRepository'

const productsRepository = new ProductsRepository()

export class ListProductsByNameController {
	async handle (request: Request, response: Response): Promise<Response> {
		const { name } = request.body

		const listProductsByNameService = new ListProductsByNameService(productsRepository)

		const products = await listProductsByNameService.execute(name)

		return response.json(products)
	}
}
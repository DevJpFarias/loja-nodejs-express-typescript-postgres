import 'reflect-metadata'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListProductsByNameService } from '../ProductsControllerHelpers'

export class ListProductsByNameController {
	async handle (request: Request, response: Response): Promise<Response> {
		const { name } = request.body

		const listProductsByNameService = container.resolve(ListProductsByNameService)

		const products = await listProductsByNameService.execute(name)

		return response.json(products)
	}
}
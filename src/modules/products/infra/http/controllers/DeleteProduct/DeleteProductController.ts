import 'reflect-metadata'
import { Request, Response } from 'express'
import { DeleteProductService } from '../ProductsControllerHelpers'
import { ProductsRepository } from '../../../typeorm/repositories/ProductsRepository'

const productsRepository = new ProductsRepository()

export class DeleteProductController {
	async handle (request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const deleteProductService = new DeleteProductService(productsRepository)

		const product  = await deleteProductService.execute({
			id
		})

		return response.status(202).json(product)
	}
}
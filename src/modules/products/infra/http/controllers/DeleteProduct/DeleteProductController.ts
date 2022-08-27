import 'reflect-metadata'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteProductService } from '../ProductsControllerHelpers'

export class DeleteProductController {
	async handle (request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const deleteProductService = container.resolve(DeleteProductService)

		const product  = await deleteProductService.execute({
			id
		})

		return response.status(202).json(product)
	}
}
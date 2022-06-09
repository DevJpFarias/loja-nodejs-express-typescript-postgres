import 'reflect-metadata'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateProductsService } from '../../../services/CreateProduct/CreateProductService'
import { DeleteProductService } from '../../../services/DeleteProduct/DeleteProductService'
import { ListAllProductsService } from '../../../services/ListAllProducts/ListAllProductsService'
import { ListProductsByNameService } from '../../../services/ListProductsByName/ListProductsByNameService'
import { UpdateProductService } from '../../../services/UpdateProduct/UpdateProductService'

export class ProductsController {
	async create (request: Request, response: Response): Promise<Response> {
		const { name, description, price } = request.body

		const createProductsService = container.resolve(CreateProductsService)

		const product = await createProductsService.execute({
			name,
			description,
			price
		})

		return response.status(201).json(product)
	}

	async update (request: Request, response: Response): Promise<Response> {
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

	async delete (request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const deleteProductService = container.resolve(DeleteProductService)

		const product  = await deleteProductService.execute({
			id
		})

		return response.status(202).json(product)
	}

	async listByName (request: Request, response: Response): Promise<Response> {
		const { name } = request.body

		const listProductsByNameService = container.resolve(ListProductsByNameService)

		const products = await listProductsByNameService.execute(name)

		return response.json(products)
	}

	async listAll (request: Request, response: Response): Promise<Response> {
		const listAllProductsService = container.resolve(ListAllProductsService)

		const products = await listAllProductsService.execute()

		return response.json(products)
	}
}

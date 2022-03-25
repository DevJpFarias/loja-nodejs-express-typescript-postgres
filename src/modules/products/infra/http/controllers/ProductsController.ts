import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateProductsService } from '../../../services/CreateProduct/CreateProductService'
import { DeleteProductService } from '../../../services/DeleteProduct/DeleteProductService'
import { ListProductsService } from '../../../services/ListProducts/ListProductsService'
import { UpdateProductService } from '../../../services/UpdateProduct/UpdateProductService'


export class ProductsController {
	async create(request: Request, response: Response): Promise<Response> {
		const { name, description, price } = request.body

		const createProducts = container.resolve(CreateProductsService)

		const product = await createProducts.execute({
			name,
			description,
			price
		})

		return response.status(201).json(product)
	}

	async update(request: Request, response: Response): Promise<Response> {
		const { id } = request.params
		const { name, description, price } = request.body

		const updateProduct = container.resolve(UpdateProductService)

		const product = await updateProduct.execute({
			id,
			name,
			description,
			price
		})

		return response.json(product)
	}

	async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const deleteProduct = container.resolve(DeleteProductService)

		await deleteProduct.execute({
			id
		})

		return response.status(202).send()
	}

	async listByName(request: Request, response: Response): Promise<Response> {
		const { name } = request.body

		const listProducts = container.resolve(ListProductsService)

		const products = await listProducts.execute(name)

		return response.json(products)
	}
}
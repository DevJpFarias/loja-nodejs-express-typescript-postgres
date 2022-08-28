import { AppError } from '../../../../shared/errors/AppError'
import { IUpdateProductDTO } from '../../dtos/IUpdateProductDTO'
import { Product } from '../../infra/typeorm/entities/Product'
import { ProductsRepository } from '../../infra/typeorm/repositories/ProductsRepository'
import { IProductsRepository } from '../../repositories/IProductsRepository'

export class UpdateProductService {
	private productsRepository: IProductsRepository

	constructor(repository: IProductsRepository) {
		this.productsRepository = repository

		if(!repository) {
			this.productsRepository = new ProductsRepository()
		}
	}

	async execute({ id, name, description, price }: IUpdateProductDTO): Promise<Product> {
		const product = await this.productsRepository.findById(id)

		if(!product) throw new AppError('Product not found!', 400)

		product.name = name
		product.description = description
		product.price = price

		await this.productsRepository.update(product)

		return product
	}
}
import { Product } from '../../infra/typeorm/entities/Product'
import { ProductsRepository } from '../../infra/typeorm/repositories/ProductsRepository'
import { IProductsRepository } from '../../repositories/IProductsRepository'

export class ListAllProductsService {
	private productsRepository: IProductsRepository

	constructor(repository: IProductsRepository) {
		this.productsRepository = repository

		if(!repository) {
			this.productsRepository = new ProductsRepository()
		}
	}

	async execute(): Promise<Product[]> {
		const products = await this.productsRepository.listAll()

		return products
	}
}
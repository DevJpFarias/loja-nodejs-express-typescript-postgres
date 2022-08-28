import { Product } from '../../infra/typeorm/entities/Product'
import { ProductsRepository } from '../../infra/typeorm/repositories/ProductsRepository'
import { IProductsRepository } from '../../repositories/IProductsRepository'

export class ListProductsByNameService {
	private productsRepository: IProductsRepository
	
	constructor(repository: IProductsRepository) {
		this.productsRepository = repository

		if(!repository) {
			this.productsRepository = new ProductsRepository()
		}
	}

	async execute(name: string): Promise<Product[]> {
		const products = await this.productsRepository.listByName(name)

		return products
	}
}
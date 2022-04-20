import { inject, injectable } from 'tsyringe'
import { Product } from '../../infra/typeorm/entities/Product'
import { IProductsRepository } from '../../repositories/IProductsRepository'

@injectable()
export class ListProductsByNameService {
	constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
	) {}

	async execute(name: string): Promise<Product[]> {
		const products = await this.productsRepository.listByName(name)

		return products
	}
}
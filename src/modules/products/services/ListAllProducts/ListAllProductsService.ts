import { inject, injectable } from 'tsyringe'
import { Product } from '../../infra/typeorm/entities/Product'
import { IProductsRepository } from '../../repositories/IProductsRepository'

@injectable()
export class ListAllProductsService {
	constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
	) {}

	async execute(): Promise<Product[]> {
		const products = await this.productsRepository.listAll()

		return products
	}
}
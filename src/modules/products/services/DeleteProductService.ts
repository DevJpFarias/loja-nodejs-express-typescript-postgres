import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../shared/errors/AppError'
import { IProductsRepository } from '../repositories/IProductsRepository'

@injectable()
export class DeleteProductService {
	constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
	) {}

	async execute(id: string): Promise<void> {
		const product = await this.productsRepository.findById(id)
		console.log('product-DeleteService', !product)

		if(!product) throw new AppError('Product not found!')

		await this.productsRepository.delete(product)
	}
}
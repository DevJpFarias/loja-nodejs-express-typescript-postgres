import { AppError } from '../../../../shared/errors/AppError'
import { IDeleteProductDTO } from '../../dtos/IDeleteProductDTO'
import { ProductsRepository } from '../../infra/typeorm/repositories/ProductsRepository'
import { IProductsRepository } from '../../repositories/IProductsRepository'

export class DeleteProductService {
	private productsRepository: IProductsRepository

	constructor(repository: IProductsRepository) {
		this.productsRepository = repository

		if(!repository) {
			this.productsRepository = new ProductsRepository()
		}
	}

	async execute({ id }: IDeleteProductDTO): Promise<void> {
		const product = await this.productsRepository.findById(id)

		if(!product) throw new AppError('Product not found!', 400)

		await this.productsRepository.delete(product)
	}
}
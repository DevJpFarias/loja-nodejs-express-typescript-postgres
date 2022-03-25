import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/errors/AppError'
import { IDeleteProductDTO } from '../../dtos/IDeleteProductDTO'
import { IProductsRepository } from '../../repositories/IProductsRepository'

@injectable()
export class DeleteProductService {
	constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
	) {}

	async execute({ id }: IDeleteProductDTO): Promise<void> {
		const product = await this.productsRepository.findById(id)

		if(!product) throw new AppError('Product not found!', 404)

		await this.productsRepository.delete(product)
	}
}
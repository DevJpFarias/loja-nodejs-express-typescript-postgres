import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/errors/AppError'
import { IUpdateProductDTO } from '../../dtos/IUpdateProductDTO'
import { Product } from '../../infra/typeorm/entities/Product'
import { IProductsRepository } from '../../repositories/IProductsRepository'

@injectable()
export class UpdateProductService {
	constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
	) {}

	async execute({ id, name, description, price }: IUpdateProductDTO): Promise<Product> {
		const product = await this.productsRepository.findById(id)

		if(!product) throw new AppError('Product not found!', 404)

		product.name = name
		product.description = description
		product.price = price

		await this.productsRepository.update(product)

		return product
	}
}
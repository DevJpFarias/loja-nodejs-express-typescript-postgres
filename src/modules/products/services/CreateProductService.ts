//import { AppError } from '../../../shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

import { Product } from '../infra/typeorm/entities/Product'
import { IProductsRepository } from '../repositories/IProductsRepository'
import { ICreateProductDTO} from '../dtos/ICreateProductDTO'

@injectable()
export class CreateProductsService {
	constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
	) {}

	async execute({
		name,
		description,
		price
	}: ICreateProductDTO): Promise<Product> {
		const product = await this.productsRepository.create({
			name,
			description,
			price
		})

		return product
	}
}

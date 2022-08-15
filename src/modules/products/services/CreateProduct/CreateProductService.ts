//import { AppError } from '../../../shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

import { Product } from '../../infra/typeorm/entities/Product'
import { IProductsRepository } from '../../repositories/IProductsRepository'
import { ICreateProductDTO} from '../../dtos/ICreateProductDTO'
import { AppError } from '../../../../shared/errors/AppError'

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
		if(!name) throw new AppError('The product must have a name', 400)

		if(price <= 0) throw new AppError('Cannot have a negative or zero value!', 400)

		const product = await this.productsRepository.create({
			name,
			description,
			price
		})

		return product
	}
}

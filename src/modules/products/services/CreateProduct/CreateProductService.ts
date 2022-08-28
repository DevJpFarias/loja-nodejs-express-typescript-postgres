import 'reflect-metadata'
import { Product } from '../../infra/typeorm/entities/Product'
import { IProductsRepository } from '../../repositories/IProductsRepository'
import { ICreateProductDTO} from '../../dtos/ICreateProductDTO'
import { AppError } from '../../../../shared/errors/AppError'

export class CreateProductsService {
	private productsRepository: IProductsRepository

	constructor(repository: IProductsRepository) {
		this.productsRepository = repository
		
		if(!repository) {
			this.productsRepository = repository
		}
	}

	async execute({
		name,
		description,
		price,
		brand,
		expiration_date
	}: ICreateProductDTO): Promise<Product> {
		if(!name) throw new AppError('The product must have a name', 400)

		if(price <= 0) throw new AppError('Cannot have a negative or zero value!', 400)

		const product = await this.productsRepository.create({
			name,
			description,
			price,
			brand,
			expiration_date
		})

		return product
	}
}

import { getRepository, Repository } from 'typeorm'
import { ICreateProductDTO } from '../../../dtos/ICreateProductDTO'
import { IProductsRepository } from '../../../repositories/IProductsRepository'
import { Product } from '../entities/Product'

export class ProductsRepository implements IProductsRepository {
	private repository: Repository<Product>

	constructor() {
		this.repository = getRepository(Product)
	}

	async create({
		name,
		description,
		price
	}: ICreateProductDTO): Promise<Product> {
		const product = await this.repository.create({
			name,
			description,
			price
		})

		await this.repository.save(product)

		return product
	}

	async showByName(name: string): Promise<Product[]> {
		const products = await this.repository.find({
			name
		})

		return products
	}
}
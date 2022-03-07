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
		const product = this.repository.create({
			name,
			description,
			price
		})

		await this.repository.save(product)

		return product
	}

	async listByName(name: string): Promise<Product[]> {
		const products = await this.repository.find({
			name
		})

		return products
	}

	async findByName(name: string): Promise<Product | undefined> {
		const service = await this.repository.findOne({
			where: { name }
		})

		return service
	}
}
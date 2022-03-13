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

	async update(product: Product): Promise<Product> {
		await this.repository.save(product)

		return product
	}

	async delete(product: Product): Promise<void> {
		await this.repository.remove(product)
	}

	async listByName(name: string): Promise<Product[]> {
		const products = await this.repository.find({
			where : { name },
			skip: 0,
			take: 10,
		})

		return products
	}

	async findByName(name: string): Promise<Product | undefined> {
		const product = await this.repository.findOne({
			where: { name }
		})

		return product
	}

	async findById(id: string): Promise<Product> {
		const product = await this.repository.findOne(id)
		console.log('product-findById', product)

		return product
	}
}
import { getRepository, Repository } from 'typeorm'
import { ICreateProductDTO } from '../../../dtos/ICreateProductDTO'
import { IProductsRepository } from '../../../repositories/IProductsRepository'
import { Product } from '../entities/Product'

export class ProductsRepository implements IProductsRepository {
	private ormRepository: Repository<Product>

	constructor() {
		this.ormRepository = getRepository(Product)
	}

	async create({
		name,
		description,
		price
	}: ICreateProductDTO): Promise<Product> {
		const product = this.ormRepository.create({
			name,
			description,
			price
		})

		await this.ormRepository.save(product)

		return product
	}

	async update(product: Product): Promise<Product> {
		await this.ormRepository.save(product)

		return product
	}

	async delete(product: Product): Promise<void> {
		await this.ormRepository.remove(product)
	}

	async listByName(name: string): Promise<Product[]> {
		const products = await this.ormRepository.find({
			where : { name },
			skip: 0,
			take: 10,
		})

		return products
	}

	async findByName(name: string): Promise<Product | undefined> {
		const product = await this.ormRepository.findOne({
			where: { name }
		})

		return product
	}

	async findById(id: string): Promise<Product> {
		const product = await this.ormRepository.findOne(id)
		console.log('product-findById', product)

		return product
	}
}
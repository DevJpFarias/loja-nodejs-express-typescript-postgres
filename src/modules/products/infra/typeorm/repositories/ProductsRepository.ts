import { Repository } from 'typeorm'
import { ICreateProductDTO } from '../../../dtos/ICreateProductDTO'
import { IProductsRepository } from '../../../repositories/IProductsRepository'
import { Product } from '../entities/Product'
import { database } from '../../../../../shared/helpers/database-connection-helper'

export class ProductsRepository implements IProductsRepository {
	private ormRepository: Repository<Product>

	constructor() {
		this.ormRepository = database.getRepository(Product)
	}

	async create({
		name,
		description,
		price,
		brand,
		expiration_date
	}: ICreateProductDTO): Promise<Product> {
		const product = this.ormRepository.create({
			name,
			description,
			price,
			brand,
			expiration_date
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

	async listAll(): Promise<Product[]> {
		const products = await this.ormRepository.find()

		return products
	}

	async findById(id: string): Promise<Product> {
		const product = await this.ormRepository.findOne({
			where: {
				id: id
			}
		})

		return product
	}
}
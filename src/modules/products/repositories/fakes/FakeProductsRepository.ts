import { ICreateProductDTO } from '../../dtos/ICreateProductDTO'
import { Product } from '../../infra/typeorm/entities/Product'
import { IProductsRepository } from '../IProductsRepository'
import { v4 as uuid } from 'uuid'

export class FakeProductsRepository implements IProductsRepository {
	products: Product[] = []

	async create({name, description, price}: ICreateProductDTO): Promise<Product> {
		const product = new Product()

		Object.assign(product, {
			id: uuid(),
			name,
			description,
			price
		})

		this.products.push(product)

		return product
	}

	async update(product: Product): Promise<Product> {
		const findProductIndex = this.products.findIndex(updatable_product => updatable_product.id === product.id)

		this.products[findProductIndex] = product

		return product
	}

	async listByName(name: string): Promise<Product[]> {
		const allProducts = this.products.filter(product => product.name === name)

		return allProducts
	}

	async findByName(name: string): Promise<Product> {
		const product = this.products.find(product => product.name === name)

		return product
	}

	async findById(id: string): Promise<Product> {
		const product = this.products.find(product => product.id === id)

		return product
	}

	async delete(product: Product): Promise<void> {
		const deleteProduct = this.products.find(delete_product => delete_product.id === product.id)

		const productIndex = this.products.indexOf(deleteProduct)

		this.products.splice(productIndex, 1)
	}
}

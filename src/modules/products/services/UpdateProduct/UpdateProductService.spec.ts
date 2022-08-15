import { AppError } from '../../../../shared/errors/AppError'
import { FakeProductsRepository } from '../../repositories/fakes/FakeProductsRepository'
import { CreateProductsService } from '../CreateProduct/CreateProductService'
import { UpdateProductService } from './UpdateProductService'

let fakeProductsRepository: FakeProductsRepository
let createProductsService: CreateProductsService
let updateProductService: UpdateProductService

describe('Update product', () => {
	beforeEach(() => {
		fakeProductsRepository = new FakeProductsRepository()
		createProductsService = new CreateProductsService(fakeProductsRepository)
		updateProductService = new UpdateProductService(fakeProductsRepository)
	})

	it('Should be able to update a product', async () => {
		const product = await createProductsService.execute({
			name: 'Pizza',
			description: 'Mista',
			price: 50,
			brand: 'Brand',
			expiration_date: new Date(2022, 12, 31)
		})

		const update_product = await updateProductService.execute({
			id: product.id,
			name: 'Pizza',
			description: 'Bacon',
			price: 50
		})

		expect(product.id).toBe(update_product.id)
		expect(product.name).toBe(update_product.name)
		expect(product.description).toBe(update_product.description)
		expect(product.price).toBe(update_product.price)
	})

	it('Should not be able to update a nonexistent product', async () => {
		await expect(updateProductService.execute({
			id: '1234',
			name: 'Pizza',
			description: 'Bacon',
			price: 100
		})).rejects.toEqual(new AppError('Product not found!', 400))
	})
})
import  { FakeProductsRepository } from '../../repositories/fakes/FakeProductsRepository'
import { CreateProductsService } from './CreateProductService'

let fakeProductsRepository: FakeProductsRepository
let createProductsService: CreateProductsService

describe('Products creation', () => {
	beforeEach(() => {
		fakeProductsRepository = new FakeProductsRepository()
		createProductsService = new CreateProductsService(fakeProductsRepository)
	})

	it('Should be able to create a new product', async () => {
		const product = await createProductsService.execute({
			name: 'Biscoito',
			description: 'Sabor morango',
			price: 3
		})

		expect(product).toHaveProperty('id')
	})
})
import { FakeProductsRepository } from '../repositories/fakes/FakeProductsRepository'
import { CreateProductsService } from './CreateProductService'
import { ListProductsService } from './ListProductsService'

let fakeProductsRepository: FakeProductsRepository
let createProductsService: CreateProductsService
let listProductsService: ListProductsService

describe('List Products', () => {
	beforeEach(() => {
		fakeProductsRepository = new FakeProductsRepository()
		createProductsService = new CreateProductsService(fakeProductsRepository)
		listProductsService = new ListProductsService(fakeProductsRepository)
	})

	it('Should be able to list a array of products with his names', async () => {
		const product = await createProductsService.execute({
			name: 'Sorvete',
			description: 'Sabor flocos',
			price: 20
		})

		const product2 = await createProductsService.execute({
			name: 'Sorvete',
			description: 'Sabor chocolate',
			price: 25
		})

		const products = await listProductsService.execute('Sorvete')

		expect(products).toEqual([product, product2])
	})
})
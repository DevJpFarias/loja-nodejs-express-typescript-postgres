import { ICreateProductDTO } from '../../dtos/ICreateProductDTO'
import { FakeProductsRepository } from '../../repositories/fakes/FakeProductsRepository'
import { CreateProductsService } from '../CreateProduct/CreateProductService'
import { ListProductsByNameService } from './ListProductsByNameService'

let fakeProductsRepository: FakeProductsRepository
let createProductsService: CreateProductsService
let listProductsByNameService: ListProductsByNameService

describe('List Products', () => {
	beforeEach(() => {
		fakeProductsRepository = new FakeProductsRepository()
		createProductsService = new CreateProductsService(fakeProductsRepository)
		listProductsByNameService = new ListProductsByNameService(fakeProductsRepository)
	})

	it('Should be able to list a array of products with his names', async () => {
		const product: ICreateProductDTO = await createProductsService.execute({
			name: 'Sorvete',
			description: 'Sabor flocos',
			price: 20,
			brand: 'Brand',
			expiration_date: new Date(2022, 12, 31)
		})

		const product2: ICreateProductDTO = await createProductsService.execute({
			name: 'Sorvete',
			description: 'Sabor chocolate',
			price: 25,
			brand: 'Brand',
			expiration_date: new Date(2022, 12, 31)
		})

		const products = await listProductsByNameService.execute('Sorvete')

		expect(products).toEqual([product, product2])
	})
})
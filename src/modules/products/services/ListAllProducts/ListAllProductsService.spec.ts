import { FakeProductsRepository } from '../../repositories/fakes/FakeProductsRepository'
import { ListAllProductsService } from './ListAllProductsService'

let fakeProductsRepository: FakeProductsRepository
let listAllProductsService: ListAllProductsService

describe('List All Products Test', () => {
	beforeEach(() => {
		fakeProductsRepository = new FakeProductsRepository()
		listAllProductsService = new ListAllProductsService(fakeProductsRepository)
	})

	it('Should be able to list all products', async () => {
		const spyListAllProducts = jest.spyOn(fakeProductsRepository, 'listAll')

		const products = await listAllProductsService.execute()

		expect(spyListAllProducts).toBeCalledTimes(1)
		expect(products).toEqual([])
	})
})
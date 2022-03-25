import { AppError } from '../../../../shared/errors/AppError'
import { FakeProductsRepository } from '../../repositories/fakes/FakeProductsRepository'
import { CreateProductsService } from '../CreateProduct/CreateProductService'
import { DeleteProductService } from './DeleteProductService'

let fakeProductsRepository: FakeProductsRepository
let createProductService: CreateProductsService
let deleteProductService: DeleteProductService

describe('Delete Product', () => {
	beforeEach(() => {
		fakeProductsRepository = new FakeProductsRepository()
		createProductService = new CreateProductsService(fakeProductsRepository)
		deleteProductService = new DeleteProductService(fakeProductsRepository)
	})

	it('Should not be able to delete a nonexistent product', async () => {
		expect(deleteProductService.execute({ id: '1234'})).rejects.toBeInstanceOf(AppError)
	})

	it('Should be able to delete a product', async () => {
		const product = await createProductService.execute({
			name: 'Biscoito recheado',
			description: 'Sabor maracujá',
			price: 2
		})

		const spyDelete = jest.spyOn(fakeProductsRepository, 'delete')

		await deleteProductService.execute({ id: product.id })

		expect(spyDelete).toBeCalledWith(product)
		expect(spyDelete).toBeCalledTimes(1)
	})
})

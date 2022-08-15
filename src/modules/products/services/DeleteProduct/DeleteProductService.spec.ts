import { AppError } from '../../../../shared/errors/AppError'
import { ICreateProductDTO } from '../../dtos/ICreateProductDTO'
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
		await expect(
			deleteProductService.execute({
				id: '1234'
			})
		).rejects.toEqual(new AppError('Product not found!', 404))
	})

	it('Should be able to delete a product', async () => {
		const data: ICreateProductDTO = {
			name: 'Biscoito recheado',
			description: 'Sabor maracujá',
			price: 2,
			brand: 'Brand',
			expiration_date: new Date(2022, 12, 31)
		}

		const product = await createProductService.execute(data)

		const spyDelete = jest.spyOn(fakeProductsRepository, 'delete')

		await deleteProductService.execute({ id: product.id })

		expect(spyDelete).toBeCalledWith(product)
		expect(spyDelete).toBeCalledTimes(1)
	})
})

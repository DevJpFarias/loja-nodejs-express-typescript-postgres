import { AppError } from '../../../../shared/errors/AppError'
import { ICreateProductDTO } from '../../dtos/ICreateProductDTO'
import  { FakeProductsRepository } from '../../repositories/fakes/FakeProductsRepository'
import { CreateProductsService } from './CreateProductService'

let fakeProductsRepository: FakeProductsRepository
let createProductsService: CreateProductsService

describe('Products creation', () => {
	beforeEach(() => {
		fakeProductsRepository = new FakeProductsRepository()
		createProductsService = new CreateProductsService(fakeProductsRepository)
	})

	it('Should not be able to create a new product without name', async () => {
		const data: ICreateProductDTO = {
			name: '',
			description: 'Sabor morango',
			price: 3
		}

		await expect(createProductsService.execute(data)).rejects.toEqual(new AppError('The product must have a name', 400))
	})

	it('Should not be able to create a new product zero value', async () => {
		const data: ICreateProductDTO = {
			name: 'Biscoito',
			description: 'Morango',
			price: 0
		}

		await expect(createProductsService.execute(data)).rejects.toEqual(new AppError('Cannot have a negative or zero value!', 400))
	})

	it('Should not be able to create a new product with negative value', async () => {
		const data: ICreateProductDTO = {
			name: 'Biscoito',
			description: 'Sabor morango',
			price: -3
		}

		await expect(createProductsService.execute(data)).rejects.toEqual(new AppError('Cannot have a negative or zero value!', 400))
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
import request from 'supertest'
import { hash } from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { DataSource } from 'typeorm'
import { Product } from '../../typeorm/entities/Product'
import { User } from '../../../../users/infra/typeorm/entities/User'
import { ProductsController } from './ProductsController'
import { CreateProductsService } from '../../../services/CreateProduct/CreateProductService'
import { app } from '../../../../../shared/infra/http/app'
import { Express } from 'express'
import { FakeProductsRepository } from '../../../repositories/fakes/FakeProductsRepository'
import { DeleteProductService } from '../../../services/DeleteProduct/DeleteProductService'
import { ListAllProductsService } from '../../../services/ListAllProducts/ListAllProductsService'
import { ListProductsByNameService } from '../../../services/ListProductsByName/ListProductsByNameService'
import { UpdateProductService } from '../../../services/UpdateProduct/UpdateProductService'

let fakeProductsRepository: FakeProductsRepository

let createProductsService: CreateProductsService
let deleteProductService: DeleteProductService
let listAllProductsService: ListAllProductsService
let listProductsByNameService: ListProductsByNameService
let updateProductService: UpdateProductService

jest.mock('supertest')

describe('Products Controller Test', () => {
	beforeAll(async () => {
		fakeProductsRepository = new FakeProductsRepository()
		createProductsService = new CreateProductsService(fakeProductsRepository)
		deleteProductService = new DeleteProductService(fakeProductsRepository)
	})

	it('Should be able to create a product if user is an admin', async () => {
		const responseToken = await request(app).post('/session').send({
			email: 'admin@migufes.com.br',
			password: 'admin'
		})

		const { token } = responseToken.body

		const response = await request(app).post('/products').send({
			name: 'Biscoito',
			description: 'Sabor morango',
			price: 3
		}).set({
			Authorization: `Bearer ${token}`
		})

		//Só visualizando
		const products = await request(app).get('/products')
		const users = await request(app).get('users')

		console.log('products', products)
		console.log('users', users)

		expect(response.status).toBe(201)
	})

	it('Should not be able to create a product if user is not an admin', async () => {
		await request(app).post('/users').send({
			name: 'João Paulo',
			email: 'joaopaulo@gmail.com',
			password: '1234'
		})

		const responseToken = await request(app).post('/session').send({
			email: 'joaopaulo@gmail.com',
			password: '1234'
		})

		const { token } = responseToken.body

		const response = await request(app).post('/products').send({
			name: 'Biscoito',
			description: 'Sabor morango',
			price: 3
		}).set({
			Authorization: `Bearer ${token}`
		})

		//Só visualizando
		const products = await request(app).get('/products')
		const users = await request(app).get('users')

		console.log('products', products)
		console.log('users', users)

		expect(response.status).toBe(400)
	})

	it('Should be able to update an existent product if user is an admin', async () => {
		const responseToken = await request(app).post('/session').send({
			email: 'admin@migufes.com.br',
			password: 'admin'
		})

		const { token } = responseToken.body

		const responseCreate = await request(app).post('/products').send({
			name: 'Biscoito',
			description: 'Sabor morango',
			price: 3
		}).set({
			Authorization: `Bearer ${token}`
		})

		const product_id = await responseCreate.body.id

		// eslint-disable-next-line quotes
		const response = await request(app).put(`/products/${product_id}`).send({
			name: 'Biscoito',
			description: 'Sabor chocolate',
			price: 4
		}).set({
			Authorization: `Bearer ${token}`
		})

		//Só visualizando
		const products = await request(app).get('/products')
		const users = await request(app).get('users')

		console.log('products', products)
		console.log('users', users)

		expect(response.status).toBe(200)
	})

	it('Should not be able to update a product if user is not an admin', async () => {
		await request(app).post('/users').send({
			name: 'João Paulo',
			email: 'joaopaulo@gmail.com',
			password: '1234'
		})

		const responseToken = await request(app).post('/session').send({
			email: 'joaopaulo@gmail.com',
			password: '1234'
		})

		const { token } = responseToken.body

		const responseCreate = await request(app).post('/products').send({
			name: 'Biscoito',
			description: 'Sabor morango',
			price: 3
		}).set({
			Authorization: `Bearer ${token}`
		})

		const product_id = await responseCreate.body.id

		// eslint-disable-next-line quotes
		const response = await request(app).put(`/products/${product_id}`).send({
			name: 'Biscoito',
			description: 'Sabor chocolate',
			price: 4
		}).set({
			Authorization: `Bearer ${token}`
		})

		//Só visualizando
		const products = await request(app).get('/products')
		const users = await request(app).get('users')

		console.log('products', products)
		console.log('users', users)

		expect(response.status).toBe(400)
	})

	it('Should be able to delete an existent product if user is an admin', async () => {
		const responseToken = await request(app).post('/session').send({
			email: 'admin@migufes.com.br',
			password: 'admin'
		})

		const { token } = responseToken.body

		const responseCreate = await request(app).post('/products').send({
			name: 'Biscoito',
			description: 'Sabor morango',
			price: 3
		}).set({
			Authorization: `Bearer ${token}`
		})

		const product_id = await responseCreate.body.id

		const response = await request(app).delete(`/products/delete/${product_id}`)
			.set({
				Authorization: `Bearer ${token}`
			})

		//Só visualizando
		const products = await request(app).get('/products')
		const users = await request(app).get('users')

		console.log('products', products)
		console.log('users', users)

		expect(response.status).toBe(202)
	})

	it('Should not be able to delete a product if user is not an admin', async () => {
		await request(app).post('/users').send({
			name: 'João Paulo',
			email: 'joaopaulo@gmail.com',
			password: '1234'
		})

		const responseToken = await request(app).post('/session').send({
			email: 'joaopaulo@gmail.com',
			password: '1234'
		})

		const { token } = responseToken.body

		const responseCreate = await request(app).post('/products').send({
			name: 'Biscoito',
			description: 'Sabor morango',
			price: 3
		}).set({
			Authorization: `Bearer ${token}`
		})

		const product_id = await responseCreate.body.id

		const response = await request(app).delete(`/products/delete/${product_id}`)
			.set({
				Authorization: `Bearer ${token}`
			})

		//Só visualizando
		const products = await request(app).get('/products')
		const users = await request(app).get('users')

		console.log('products', products)
		console.log('users', users)

		expect(response.status).toBe(400)
	})

	it('Should be able to list products if user is an admin', async () => {
		const responseToken = await request(app).post('/session').send({
			email: 'admin@migufes.com.br',
			password: 'admin'
		})

		const { token } = responseToken.body

		await request(app).post('/products').send({
			name: 'Biscoito',
			description: 'Sabor morango',
			price: 3
		}).set({
			Authorization: `Bearer ${token}`
		})

		const response = await request(app).get('/products').send({
			name: 'Biscoito'
		})

		//Só visualizando
		const products = await request(app).get('/products')
		const users = await request(app).get('users')

		console.log('products', products)
		console.log('users', users)

		expect(response.status).toBe(200)
		expect(response.body.length).toEqual(3)
	})
})
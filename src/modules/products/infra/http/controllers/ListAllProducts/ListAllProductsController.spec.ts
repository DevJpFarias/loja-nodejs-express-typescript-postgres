import { DataSource } from 'typeorm'
import { app, CreateProductsService, Product, TestsDataSource, User } from '../ProductsControllerHelpers'
import { v4 as uuid } from 'uuid'
import { hash } from 'bcrypt'
import request from 'supertest'
import { ProductsRepository } from '../../../typeorm/repositories/ProductsRepository'

let productsRepository: ProductsRepository
let createProductsService: CreateProductsService

describe('List Products By Name Controller Test', () => {
	let connection: DataSource

	beforeAll(async () => {
		connection = await TestsDataSource.initialize()
		await connection.runMigrations()
	})

	beforeEach(async () => {
		productsRepository = new ProductsRepository()
		createProductsService = new CreateProductsService(productsRepository)
		const id = uuid()
		const password = await hash('admin', 8)

		await connection.query(`
    INSERT INTO USERS(id, created_at, updated_at, name, email, password, "isAdmin")
    values('${id}', 'now()', 'now()', 'JP_Admin', 'admin@migufes.com.br', '${password}', 'true')
  	`)
	})

	afterEach(async () => {
		await connection.manager.clear(Product)
		await connection.manager.clear(User)
	})

	afterAll(async () => {
		await connection.destroy()
	})

	it('Should be able to list no products', async () => {
		const response = await request(app).get('/products')

		expect(response.status).toBe(200)
		expect(response.body.length).toEqual(0)
	})

	it('Should be able to list all products', async () => {
		await createProductsService.execute({
			name: 'Biscoito',
			description: 'Sabor morango',
			price: 3,
			brand: 'Sei la',
			expiration_date: new Date(2050, 12, 30)
		})

		const response = await request(app).get('/products')

		expect(response.status).toBe(200)
		expect(response.body.length).toEqual(1)
	})
})
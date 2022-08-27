import { DataSource } from 'typeorm'
import { app, Product, TestsDataSource, User } from '../ProductsControllerHelpers'
import { v4 as uuid } from 'uuid'
import { hash } from 'bcrypt'
import request from 'supertest'

describe('Create Product Controller Test', () => {
	let connection: DataSource

	beforeAll(async () => {
		connection = await TestsDataSource.initialize()
		await connection.runMigrations()
	})

	beforeEach(async () => {
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

	it('Should be able to create a product if user is an admin', async () => {
		const responseToken = await request(app).post('/session').send({
			email: 'admin@migufes.com.br',
			password: 'admin'
		})

		const { token } = responseToken.body

		const response = await request(app).post('/products').send({
			name: 'Biscoito',
			description: 'Sabor morango',
			price: 3,
			brand: 'Sei la',
			expiration_date: '2050-08-30 21:37:37.394'
		}).set({
			Authorization: `Bearer ${token}`
		})

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
			price: 3,
			brand: 'Sei la',
			expiration_date: '2050-08-30 21:37:37.394'
		}).set({
			Authorization: `Bearer ${token}`
		})

		expect(response.status).toBe(403)
	})
})
import request from 'supertest'
import { app } from '../../../../../shared/infra/http/app'
import { hash } from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { DataSource } from 'typeorm'
import { TestDataSource } from '../../../../../shared/infra/typeorm'

let connection: DataSource

describe('Products Controller Test', () => {
	beforeAll(async() => {
		connection = await TestDataSource.initialize()
		await connection.runMigrations()

		const id = uuid()
		const password = await hash('admin', 8)

		await connection.query(`
    INSERT INTO USERS(id, created_at, updated_at, name, email, password, "isAdmin")
    values('${id}', 'now()', 'now()', 'JP_Admin', 'admin@migufes.com.br', '${password}', 'true')
  `)
	})

	afterAll(async () => {
		await connection.dropDatabase()
		await connection.destroy()
	})

	it('Should be able to create a product if you are an admin', async () => {
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

		expect(response.status).toBe(201)
	})

	it('Should be able to update an existent product if you are an admin', async () => {
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
		const response = await request(app).get(`/product`).send({
			name: 'Biscoito',
			description: 'Sabor chocolate',
			price: 4
		})

		expect(response.status).toBe(200)
	})
})
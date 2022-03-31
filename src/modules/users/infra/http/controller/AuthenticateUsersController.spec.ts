import request from 'supertest'
import { app } from '../../../../../shared/infra/http/app'
import createConnection from '../../../../../shared/infra/typeorm/index'
import { Connection } from 'typeorm'

let connection: Connection

describe('AuthenticateUserController test', () => {
	beforeEach(async () => {
		connection = await createConnection()

		await connection.query()
	})

	it('Should be able to take an token with correct information', async () => {
		const response = await request(app).post('/session')
			.send({
				email: 'joaopaulo@gmail.com',
				password: '123456'
			})

		expect(response.status).toBe(201)
	})
})
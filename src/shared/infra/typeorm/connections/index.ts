import { DataSource } from 'typeorm'
import { Product } from '../../../../modules/products/infra/typeorm/entities/Product'
import { User } from '../../../../modules/users/infra/typeorm/entities/User'

export const PostgresDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'migufe',
	password: 'admin',
	database: 'loja-migufe',
	entities: [User, Product],
	migrations: [
		'./src/shared/infra/typeorm/migrations/*.ts'
	],
	synchronize: true
})
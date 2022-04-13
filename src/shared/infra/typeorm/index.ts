import { DataSource } from 'typeorm'

export const PostgresDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'migufe',
	password: 'admin',
	database: 'loja-migufe',
	entities: [
		'./src/modules/**/infra/typeorm/entities/*.ts'
	],
	migrations: [
		'./src/shared/infra/typeorm/migrations/*.ts'
	]
})

export const TestDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'migufe',
	password: 'admin',
	database: 'loja-migufe-test',
	entities: [
		'./src/modules/**/infra/typeorm/entities/*.ts'
	],
	migrations: [
		'./src/shared/infra/typeorm/migrations/*.ts'
	]
})
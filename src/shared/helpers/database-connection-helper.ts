import { DataSource } from 'typeorm'
import { PostgresDataSource } from '../infra/typeorm/connections'
import { TestsDataSource } from '../infra/typeorm/connections/tests'

interface IDatabase {
	[key: string]: DataSource
}

const databases: IDatabase = {
	test: TestsDataSource,
	prod: PostgresDataSource,
}

const environment = process.env.NODE_ENV || 'prod'

export const database = databases[environment]
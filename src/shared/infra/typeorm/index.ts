import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export default async (host = 'localhost'): Promise<Connection> => {
	const defaultOptions = getConnectionOptions()

	return createConnection(
		await Object.assign(defaultOptions, {
			host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
			database:
        process.env.NODE_ENV === 'test' ? 'loja-migufe-test' : (await defaultOptions).database,
		})
	)
}
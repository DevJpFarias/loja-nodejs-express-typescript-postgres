import { hash } from 'bcrypt'
import { v4 as uuid } from 'uuid'

import { PostgresDataSource } from '../connections/index'

async function create() {
	const connection = await PostgresDataSource.initialize()

	const id = uuid()
	const password = await hash('admin', 8)

	await connection.query(`
    INSERT INTO USERS(id, created_at, updated_at, name, email, password, "isAdmin")
    values('${id}', 'now()', 'now()', 'JP_Admin', 'admin@migufes.com.br', '${password}', 'true')
  `)

	await connection.destroy()
}

create().then(() => console.log('User admin created!'))
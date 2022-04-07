import { hash } from 'bcrypt'
import { v4 as uuid } from 'uuid'

import createConnection from '../index'

async function create() {
	const connection = await createConnection('localhost')

	const id = uuid()
	const password = await hash('admin', 8)

	await connection.query(`
    INSERT INTO USERS(id, created_at, updated_at, name, email, password, "isAdmin")
    values('${id}', 'now()', 'now()', 'JP_Admin', 'admin@migufes.com.br', '${password}', 'true')
  `)

	await connection.close
}

create().then(() => console.log('User admin created!'))
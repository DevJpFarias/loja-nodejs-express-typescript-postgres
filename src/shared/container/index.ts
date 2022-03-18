import { container } from 'tsyringe'

import { IProductsRepository } from '../../modules/products/repositories/IProductsRepository'
import { ProductsRepository } from '../../modules/products/infra/typeorm/repositories/ProductsRepository'
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository'
import { UsersRepository } from '../../modules/users/infra/typeorm/repositories/UsersRepository'

container.registerSingleton<IProductsRepository>(
	'ProductsRepository',
	ProductsRepository
)

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository
)
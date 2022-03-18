import { ICreateProductDTO } from '../dtos/ICreateUserDTO'
import { User } from '../infra/typeorm/entities/User'

export interface IUsersRepository {
  create(data: ICreateProductDTO): Promise<User>
}
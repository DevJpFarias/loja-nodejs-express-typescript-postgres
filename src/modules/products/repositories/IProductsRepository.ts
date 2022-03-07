import { Product } from '../infra/typeorm/entities/Product'
import { ICreateProductDTO } from '../dtos/ICreateProductDTO'

export interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>
  showByName(name: string): Promise<Product[]>
}

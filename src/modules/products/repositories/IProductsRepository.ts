import { Product } from '../infra/typeorm/entities/Product'
import { ICreateProductDTO } from '../dtos/ICreateProductDTO'

export interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>
  update(product: Product): Promise<Product>
  listByName(name: string): Promise<Product[]>
  listAll(): Promise<Product[]>
  findById(id: string): Promise<Product>
  delete(product: Product): Promise<void>
}

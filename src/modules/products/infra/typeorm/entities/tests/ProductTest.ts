/* eslint-disable no-mixed-spaces-and-tabs */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,  } from 'typeorm'

@Entity('products')
export class Product {
  
  @PrimaryGeneratedColumn('uuid')	
  	id: string

	@CreateDateColumn()
  	created_at: Date

  @UpdateDateColumn()
  	updated_at: Date

  @Column()
  	name: string
  
  @Column()
  	description: string

  @Column()
  	price: number
}
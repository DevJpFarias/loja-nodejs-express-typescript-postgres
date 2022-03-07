/* eslint-disable no-mixed-spaces-and-tabs */
import { v4 as uuidV4 } from 'uuid'
import { Column, Entity, PrimaryColumn,  } from 'typeorm'

@Entity('products')
export class Product {
  
  @PrimaryColumn()	
  	id: string

  @Column()
  	name: string
  
  @Column()
  	description: string

  @Column()
  	price: number

  constructor() {
  	if(!this.id) {
  		this.id = uuidV4()
  	}
  }
}
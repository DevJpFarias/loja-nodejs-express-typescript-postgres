/* eslint-disable no-mixed-spaces-and-tabs */
import { Column, CreateDateColumn, Entity, UpdateDateColumn,  } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity()
export class User {
  @Column()
  	id: string

  @Column()
  	name: string

  @Column()
  	email: string 

  @Column()
  	password: string

  @CreateDateColumn()
  	created_at: Date

  @UpdateDateColumn()
  	updated_at: Date

  constructor() {
  	if(!this.id) {
  		this.id = uuid()
  	}
  }
}
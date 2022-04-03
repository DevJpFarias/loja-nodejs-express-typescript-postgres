/* eslint-disable no-mixed-spaces-and-tabs */
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn,  } from 'typeorm'
import { Exclude } from 'class-transformer'
import { v4 as uuid } from 'uuid'

@Entity('users')
export class User {
  @PrimaryColumn()
  	id: string
	
	@CreateDateColumn()
  	created_at: Date

  @UpdateDateColumn()
  	updated_at: Date

  @Column()
  	name: string

  @Column()
  	email: string 

  @Column()
	@Exclude()
  	password: string

	@Column()
		isAdmin: boolean
	
	constructor() {
  	if(!this.id) {
  		this.id = uuid()
  	}
	}
}
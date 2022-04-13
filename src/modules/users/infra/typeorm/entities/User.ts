/* eslint-disable no-mixed-spaces-and-tabs */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,  } from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
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
}
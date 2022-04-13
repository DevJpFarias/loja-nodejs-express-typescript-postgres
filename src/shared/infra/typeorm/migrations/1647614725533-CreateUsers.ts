import {MigrationInterface, QueryRunner, Table} from 'typeorm'

export class CreateUsers1647614725533 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()'
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()'
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'now()'
					},
					{
						name: 'name',
						type: 'varchar'
					},
					{
						name: 'email',
						type: 'varchar',
						isUnique: true
					},
					{
						name: 'password',
						type: 'varchar'
					},
					{
						name: 'isAdmin',
						type: 'boolean',
						default: false
					}
				]
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users')
	}
}

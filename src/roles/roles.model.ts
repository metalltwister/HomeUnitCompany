import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface RoleCreationAttributes {
  roleName: string
  description: string
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttributes> {

  @ApiProperty({ example: '1', description: 'Unique role id' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @ApiProperty({ example: 'SERVICE', description: 'Unique role name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  roleName: string

  @ApiProperty({ example: 'This is a service worker', description: 'Role description' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string
}
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttributes {
  roleName: string
  description: string
}
@ObjectType()
@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttributes> {

  @Field(type => Int)
  @ApiProperty({ example: '1', description: 'Unique role id' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @Field()
  @ApiProperty({ example: 'SERVICE', description: 'Unique role name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  roleName: string

  @Field()
  @ApiProperty({ example: 'This is a service worker', description: 'Role description' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string

  @Field(() => User)
  @BelongsToMany(() => User, () => UserRoles)
  users: User[]

}
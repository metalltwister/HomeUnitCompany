import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Group } from "src/groups/groups.model";
import { UserGroups } from "src/groups/user-groups.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttributes {
  phone: number
  password: string
}

@ObjectType()
@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {

  @Field(() => Int)
  @ApiProperty({ example: '1', description: 'Unique user id' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @Field()
  @ApiProperty({ example: 88005553535, description: 'Unique phone number' })
  @Column({ type: DataType.BIGINT, unique: true, allowNull: false })
  phone: number

  @ApiProperty({ example: '123456qwertyui', description: 'User password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string

  @Field(() => String, { nullable: true })
  @ApiProperty({ example: 'Jhon Doe', description: `User's name` })
  @Column({ type: DataType.STRING, allowNull: true })
  name: string

  @Field(() => Boolean)
  @ApiProperty({ example: 'true', description: 'Ban status' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean

  @Field(() => String)
  @ApiProperty({ example: 'Breaking rules', description: 'Ban reason' })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string

  @Field(() => Role)
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[]

  @BelongsToMany(() => Group, () => UserGroups)
  groups: Group[]

}
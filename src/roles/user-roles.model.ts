import { Field, Int, ObjectType } from "@nestjs/graphql"
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { User } from "src/users/users.model"
import { Role } from "./roles.model"

@ObjectType()
@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {

  @Field(() => Int)
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @Field(() => Int)
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number

  @Field(() => Int)
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number

}
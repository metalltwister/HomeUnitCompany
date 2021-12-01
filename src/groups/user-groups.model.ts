import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Group } from "./groups.model";

interface GroupCreationAttributes {
  title: string
  description?: string
}

@Table({ tableName: 'user_groups', createdAt: false, updatedAt: false })
export class UserGroups extends Model<UserGroups, GroupCreationAttributes> {

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number

  @ForeignKey(() => Group)
  @Column({ type: DataType.INTEGER })
  groupId: number
}
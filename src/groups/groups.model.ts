import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserGroups } from "./user-groups.model";

interface GroupCreationAttributes {
  title: string
  description: string
}

@Table({ tableName: 'groups' })
export class Group extends Model<Group, GroupCreationAttributes> {

  @ApiProperty({ example: '1', description: 'Unique group id' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @ApiProperty({ example: 'New Group', description: 'Unique group title' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string

  @ApiProperty({ example: 'This is a brand new group', description: 'Group description' })
  @Column({ type: DataType.STRING, allowNull: true })
  description: string

  @BelongsToMany(() => User, () => UserGroups)
  members: User[]
}

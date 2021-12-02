import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";

@Table({ tableName: 'user_friends', createdAt: false, updatedAt: false })
export class UserFriends extends Model<UserFriends> {

  @ApiProperty({ example: '1', description: 'Unique user-friends id' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @ApiProperty({ example: '42', description: 'User id' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, unique: false })
  userId: number

  @ApiProperty({ example: '24', description: 'Friend id' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, unique: false })
  friendId: number

}

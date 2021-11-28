import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttributes {
  phone: number
  password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {

  @ApiProperty({ example: '1', description: 'Unique user id' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @ApiProperty({ example: '88005553535', description: 'Unique phone number' })
  @Column({ type: DataType.BIGINT, unique: true, allowNull: false })
  phone: number

  @ApiProperty({ example: '123456', description: 'User password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string

  @ApiProperty({ example: 'Jhon Doe', description: `User's name` })
  @Column({ type: DataType.STRING, allowNull: true })
  name: string

  @ApiProperty({ example: 'true', description: 'Ban status' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean

  @ApiProperty({ example: 'Breaking rules', description: 'Ban reason' })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string

}
import { ApiProperty } from "@nestjs/swagger"

export class AddFriendDto {

  @ApiProperty({ example: 42, description: 'User ID' })
  readonly userId: number

  @ApiProperty({ example: 24, description: 'Friend ID' })
  readonly friendId: number
}
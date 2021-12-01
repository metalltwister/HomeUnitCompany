import { ApiProperty } from "@nestjs/swagger"

export class AddGroupDto {

  @ApiProperty({ example: 'Brand new group', description: 'Group title' })
  readonly groupTitle: string

  @ApiProperty({ example: 42, description: 'User ID' })
  readonly userId: number
}
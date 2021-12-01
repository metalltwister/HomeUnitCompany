import { ApiProperty } from "@nestjs/swagger"

export class CreateGroupDto {

  @ApiProperty({ example: 'Some Group', description: 'Group title' })
  readonly title: string

  @ApiProperty({ example: 'This is a brand new group', description: 'Group description' })
  readonly description: string

}

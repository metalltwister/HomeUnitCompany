import { ApiProperty } from "@nestjs/swagger"

export class SetRoleDto {

  @ApiProperty({ example: 'USER', description: 'Role name' })
  readonly roleName: string

  @ApiProperty({ example: 42, description: 'User ID' })
  readonly userId: number
}
import { ApiProperty } from "@nestjs/swagger"

export class CreateRoleDto {

  @ApiProperty({ example: 'USER', description: 'Role name' })
  readonly roleName: string

  @ApiProperty({ example: 'User', description: 'Role description' })
  readonly description: string
}
import { ApiProperty } from "@nestjs/swagger"

export class CreateRoleDto {

  @ApiProperty({ example: 'USER', description: 'Role name' })
  roleName: string

  @ApiProperty({ example: 'User', description: 'Role description' })
  description: string
}
import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {

  @ApiProperty({ example: '88005553535', description: 'Phone number' })
  readonly phone: number

  @ApiProperty({ example: '123456', description: 'Password' })
  readonly password: string
}
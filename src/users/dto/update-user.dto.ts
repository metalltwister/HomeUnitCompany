import { ApiProperty } from "@nestjs/swagger"

export class UpdateUserDto {

  @ApiProperty({ example: 88005553535, description: 'Phone number' })
  readonly phone?: number

  @ApiProperty({ example: '123456qwertyui', description: 'Password' })
  readonly password?: string

  @ApiProperty({ example: 'Jhon Doe', description: 'User name' })
  readonly name?: string

}
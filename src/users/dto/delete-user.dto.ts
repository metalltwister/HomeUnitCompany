import { ApiProperty } from "@nestjs/swagger";

export class DeleteUserDto {

  @ApiProperty({ example: '88005553535', description: 'Phone number' })
  readonly phone: number
}
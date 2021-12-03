import { Field, InputType } from "@nestjs/graphql"
import { ApiProperty } from "@nestjs/swagger"

@InputType()
export class CreateUserDto {

  @Field()
  @ApiProperty({ example: 88005553535, description: 'Phone number' })
  readonly phone: number

  @Field()
  @ApiProperty({ example: '123456', description: 'Password' })
  readonly password: string
}
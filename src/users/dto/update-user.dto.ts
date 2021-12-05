import { Field, InputType, Int } from "@nestjs/graphql"
import { ApiProperty } from "@nestjs/swagger"

@InputType()
export class UpdateUserDto {

  @Field(type => Int)
  @ApiProperty({ example: 88005553535, description: 'Phone number' })
  readonly phone?: number

  @Field()
  @ApiProperty({ example: '123456qwertyui', description: 'Password' })
  readonly password?: string

  @Field()
  @ApiProperty({ example: 'Jhon Doe', description: 'User name' })
  readonly name?: string

}
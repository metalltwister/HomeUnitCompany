import { Field, InputType, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class DeleteUserDto {

  @Field(type => Int)
  @ApiProperty({ example: '88005553535', description: 'Phone number' })
  readonly phone: number
}
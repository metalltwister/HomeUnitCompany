import { Field, InputType, Int } from "@nestjs/graphql"
import { ApiProperty } from "@nestjs/swagger"

@InputType()
export class AddGroupDto {

  @Field(type => String)
  @ApiProperty({ example: 'Brand new group', description: 'Group title' })
  readonly groupTitle: string

  @Field(type => Int)
  @ApiProperty({ example: 42, description: 'User ID' })
  readonly userId: number
}
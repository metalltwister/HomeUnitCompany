import { Field, InputType } from "@nestjs/graphql"
import { ApiProperty } from "@nestjs/swagger"

@InputType()
export class SetRoleDto {

  @Field()
  @ApiProperty({ example: 'USER', description: 'Role name' })
  readonly roleName: string

  @Field()
  @ApiProperty({ example: 42, description: 'User ID' })
  readonly userId: number
}
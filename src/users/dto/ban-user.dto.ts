import { Field, InputType } from "@nestjs/graphql"
import { ApiProperty } from "@nestjs/swagger"

@InputType()
export class BanUserDto {

  @Field()
  @ApiProperty({ example: 1, description: 'User id' })
  readonly userId: number

  @Field()
  @ApiProperty({ example: 'Breaking rules', description: 'Ban reason' })
  readonly banReason: string
}
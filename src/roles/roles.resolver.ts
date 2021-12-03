import { Args, Query, Resolver } from '@nestjs/graphql';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@Resolver(() => Role)
export class RolesResolver {

  constructor(private readonly rolesService: RolesService) { }

  createRole(roleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.createRole(roleDto)
  }

  @Query(() => Role)
  getRoleByName(@Args('roleName') roleName: string): Promise<Role> {
    return this.rolesService.getRoleByName(roleName)
  }

}

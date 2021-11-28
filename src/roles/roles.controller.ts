import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {

  constructor(private readonly rolesService: RolesService) { }

  @ApiOperation({ summary: 'Create users role' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Role })
  @Post()
  async createRole(@Body() roleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.createRole(roleDto)
  }

  @ApiOperation({ summary: 'Get Role by name' })
  @ApiResponse({ status: HttpStatus.OK, type: Role })
  @Get(':roleName')
  async getRoleByName(@Param('roleName') roleName: string): Promise<Role> {
    return this.rolesService.getRoleByName(roleName)
  }

}

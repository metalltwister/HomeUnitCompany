import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {

  constructor(@InjectModel(Role) private readonly roleRepository: typeof Role) { }

  async createRole(roleDto: CreateRoleDto): Promise<Role> {
    const newRole = await this.roleRepository.create(roleDto)
    return newRole
  }

  async getRoleByName(roleName: string): Promise<Role> {
    roleName = roleName.toUpperCase()
    const role = await this.roleRepository.findOne({ where: { roleName } })
    return role
  }

}

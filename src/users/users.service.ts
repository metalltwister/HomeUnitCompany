import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly rolesService: RolesService
  ) { }

  async createUser(userDto: CreateUserDto): Promise<User> {
    const newUser = await this.userRepository.create(userDto)
    const role = await this.rolesService.getRoleByName("USER")
    await newUser.$set('roles', [role.id])
    newUser.roles = [role]
    return newUser
  }

  async deleteUser(userDto: DeleteUserDto): Promise<string> {
    const candidate = await this.getUserByPhone(userDto.phone)
    if (!candidate) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    await this.userRepository.destroy({ where: { phone: userDto.phone }, limit: 1 })
    return `User '${candidate.phone}' deleted successfully`
  }

  async getUserByPhone(phone: number): Promise<User> {
    return await this.userRepository.findOne({ where: { phone }, include: { all: true } })
  }

  // async updateUser() { }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll({ include: { all: true } })
  }

  async banUser(banUserDto: BanUserDto): Promise<User> {
    const user = await this.userRepository.findByPk(banUserDto.userId)
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    user.banReason = banUserDto.banReason
    user.banned = true
    await user.save()
    return user
  }

  // async setRole() { }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AddFriendDto } from 'src/friends/dto/add-friend.dto';
import { FriendsService } from 'src/friends/friends.service';
import { UserFriends } from 'src/friends/user-friends.model';
import { AddGroupDto } from 'src/groups/dto/add-group.dto';
import { GroupsService } from 'src/groups/groups.service';
import { SetRoleDto } from 'src/roles/dto/set-role.dto';
import { RolesService } from 'src/roles/roles.service';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly rolesService: RolesService,
    private readonly groupsService: GroupsService,
    private readonly friendsService: FriendsService
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

  async setRole(roleDto: SetRoleDto): Promise<SetRoleDto> {
    const user = await this.userRepository.findByPk(roleDto.userId)
    const role = await this.rolesService.getRoleByName(roleDto.roleName)
    if (role && user) {
      await user.$add('role', role.id)
      return roleDto
    }
    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND)
  }

  async addGroup(groupDto: AddGroupDto): Promise<AddGroupDto> {
    const user = await this.userRepository.findByPk(groupDto.userId)
    const group = await this.groupsService.getGroupByTitle(groupDto.groupTitle)
    if (user && group) {
      await user.$add('group', group.id)
      return groupDto
    }
    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND)
  }

  async addFriend(friendDto: AddFriendDto): Promise<AddFriendDto> {
    const user = await this.userRepository.findByPk(friendDto.userId)
    const friend = await this.userRepository.findByPk(friendDto.friendId)
    if (user && friend) {
      await user.$add('friend', friend.id)
      await friend.$add('friend', user.id)
      return friendDto
    }
    throw new HttpException('One or both users not found', HttpStatus.NOT_FOUND)
  }

  async getFriends(userId: number): Promise<UserFriends[]> {
    return this.friendsService.getFriendsByUserId(userId)
  }

  async updateUser(userId: number, updateUser: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findByPk(userId)
    if (user) {
      await user.update(updateUser)
      return user
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND)
  }

  async getUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findByPk(userId, { include: { all: true } })
    if (user) {
      return user
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND)
  }
}

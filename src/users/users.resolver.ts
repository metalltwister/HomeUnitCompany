import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AddGroupDto } from 'src/groups/dto/add-group.dto';
import { SetRoleDto } from 'src/roles/dto/set-role.dto';
import { Role } from 'src/roles/roles.model';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {

  constructor(private readonly usersService: UsersService) { }

  @Mutation(() => User, { name: 'createUser' })
  createUser(@Args('userDto') userDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(userDto)
  }

  @Mutation(() => User, { name: 'updateUser' })
  updateUser(@Args('userId') userId: number, @Args('updateUser') updateUser: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(userId, updateUser)
  }

  @Mutation(() => String, { name: 'deleteUser' })
  deleteUser(@Args('userDto') userDto: DeleteUserDto): Promise<string> {
    return this.usersService.deleteUser(userDto)
  }

  @Query(() => [User], { name: 'getAllUsers' })
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers()
  }

  @Mutation(() => User, { name: 'banUser' })
  banUser(@Args('userDto') userDto: BanUserDto): Promise<User> {
    return this.usersService.banUser(userDto)
  }

  // @Mutation(() => Role /* ??? */, { name: 'setRole' })
  setRole(@Args('roleDto') roleDto: SetRoleDto): Promise<SetRoleDto> {
    return this.usersService.setRole(roleDto)
  }

  // @Mutation(() => AddGroupDto, { name: 'addGroup' })
  addGroup(@Args('groupDto') groupDto: AddGroupDto): Promise<AddGroupDto> {
    return this.usersService.addGroup(groupDto)
  }

  @Query(() => User, { name: 'getUserByPhone' })
  getUserByPhone(@Args('phone') phone: number): Promise<User> {
    return this.usersService.getUserByPhone(phone)
  }

  @Query(() => User, { name: 'getUserById' })
  getUserById(@Args('userId') userId: number): Promise<User> {
    return this.usersService.getUserById(userId)
  }

}

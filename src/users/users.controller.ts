import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth-jwt.guard';
import { AddGroupDto } from 'src/groups/dto/add-group.dto';
import { SetRoleDto } from 'src/roles/dto/set-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @Post()
  createUser(@Body() userDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(userDto)
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: HttpStatus.OK })
  @Delete()
  deleteUser(@Body() userDto: DeleteUserDto): Promise<string> {
    return this.usersService.deleteUser(userDto)
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  // @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers(): Promise<any[]> {
    return this.usersService.getAllUsers()
  }

  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @Post('/ban')
  banUser(@Body() userDto: BanUserDto): Promise<User> {
    return this.usersService.banUser(userDto)
  }

  @ApiOperation({ summary: 'Set role to user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: SetRoleDto })
  @Post('/role')
  setRole(@Body() roleDto: SetRoleDto) {
    return this.usersService.setRole(roleDto)
  }

  @ApiOperation({ summary: 'Add user to group' })
  @ApiResponse({ status: HttpStatus.CREATED, type: AddGroupDto })
  @Post('/group')
  addGroup(@Body() groupDto: AddGroupDto) {
    return this.usersService.addGroup(groupDto)
  }

  @ApiOperation({ summary: `Update part of user's info` })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Patch(':userId')
  updateUser(@Param('userId') userId: number, @Body() updateUser: UpdateUserDto) {
    return this.usersService.updateUser(userId, updateUser)
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Get(':userId')
  getUserById(@Param('userId') userId: number) {
    return this.usersService.getUserById(userId)
  }
}
